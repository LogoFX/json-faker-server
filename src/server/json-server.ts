import * as http from 'http';
import jsonServer from "json-server";
import { ServerConfig } from './server-config';
import { Request, Response, NextFunction, Application } from 'express';

export class JsonServer {
    private _server?: http.Server;
    private _routes: any;

    constructor (private _config: ServerConfig){

    }

    public Start(): void {
        this._server = this.startServer();
    }

    private startServer(): http.Server {
        const app: Application = jsonServer.create();
        const router: jsonServer.JsonServerRouter<object> = jsonServer.router(this._config.Source!);
        app.use(jsonServer.bodyParser);
        const defaults = jsonServer.defaults();
        app.use(defaults);
    
        // app.use(jsonServer.rewriter(this._routes));
    
        app.use(router);
        const server = app.listen(3000, () => {
          console.log('JSON Server is running');
        });
    
        return server;
      }
}