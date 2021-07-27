import fs from 'fs';
import lowdb from 'lowdb';
import * as http from 'http';
import jsonServer, { MiddlewaresOptions } from "json-server";
import { ServerConfig } from './server-config';
import { Request, Response, NextFunction, Application } from 'express';
import Memory from "lowdb/adapters/Memory";
import path from 'path';

const pause = require('connect-pause');


export class JsonServer {
    private _server?: http.Server;
    private _routes: any;
    private _sourceDb?: lowdb.LowdbSync<any>;

    constructor(private _sourceFile: string, private _config: ServerConfig) {
        if (this._config.routes) {
            this._routes = fs.readFileSync(this._config.routes, "utf-8")
        }

        if (this._config.watch) {
            const adapter = new Memory("");
            this._sourceDb = lowdb(adapter);
            this.watchSource();
        }
    }

    public start(): void {
        this._server = this.startServer();
    }

    private startServer(): http.Server {
        const app: Application = jsonServer.create();

        var source: any;

        if (this._sourceDb) {
            this.reloadDatabase();
            source = this._sourceDb;
        } else {
            source = this._sourceFile;
        }
        
        const router = jsonServer.router(source);
        app.use(jsonServer.bodyParser);

        const defaultsOpts: MiddlewaresOptions = {
            logger: !this._config.quiet,
            readOnly: this._config.readOnly,
            noCors: this._config.noCors,
            noGzip: this._config.noGzip,
            bodyParser: true
          };

        if (this._config.static) {
            defaultsOpts.static = path.join(process.cwd(), this._config.static);
        }          

        const defaults = jsonServer.defaults(defaultsOpts);
        app.use(defaults);

        if (this._routes) {
            const rewriter = jsonServer.rewriter(this._routes);
            app.use(rewriter);
        }

        if (this._config.middlewares) {
            app.use(this._config.middlewares);
        }        

        if (this._config.delay) {
            app.use(pause(this._config.delay));
        }

        app.use(router);
        const port = this._config.port;
        const server = app.listen(port, () => {
            console.log(`JSON Server is running. Listening port ${port}`);
        });

        return server;
    }

    private async reloadDatabase(): Promise<void> {
        if (!this._sourceDb) {
            return;
        }

        const data = JSON.parse(fs.readFileSync(this._sourceFile, "utf-8"));
        await this._sourceDb.setState(data).write();
        console.log("Database reloaded.");
    }

    private watchSource() {
        fs.watchFile(this._sourceFile, (curr, prev) => {
            if (curr.mtime === prev.mtime) {
                return;
            }

            console.log("Database file changed. Reload database.");
            this.reloadDatabase();
        });
    }
}