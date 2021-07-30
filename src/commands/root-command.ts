import { autoinject, singleton } from 'aurelia-dependency-injection';
import { Command } from "commander";
import { JsonServer } from '../server';
import { ServerConfig } from '../server/server-config';

@autoinject
@singleton()
export class RootCommand extends Command {
  constructor () {
    super();

    this
      .version(require('../../package.json').version)
      .description('json-faker-server [options] <source>')
      .option("-c, --config [config file]", "Path to config file")
      .option("-p, --port [port number]", "Set port")
      .option("-H, --host [host]", "Set host")
      .option("-w, --watch", "Watch file(s)")
      .option("-r, --routes [routes]", "Path to routes file")
      .option("-m, --middlewares [middlewares...]", "Paths to middleware files")
      .option("-s, --static [directory]", "Set static files directory")
      .option("-ro, --read-only", "Allow only GET requests")
      .option("-nc, --no-cors", "Disable Cross-Origin Resource Sharing")
      .option("-ng, --no-gzip", "Disable GZIP Content-Encoding")
      .option("-S, --snapshots [directory]", "Set snapshots directory")
      .option("-d, --delay [pause]", "Add delay to responses (ms)")
      .option("-i, --id [key]", "Set database id property (e.g. _id)")
      .option("-fsk, --foreignKeySuffix [key]", "Set foreign key suffix (e.g. _id as in post_id)")
      .option("-q, --quiet", "Suppress log messages from output")
      .arguments('<source>')
      .action(this.run);

    this.parse(process.argv);
  }

  private run(source: string, options: any, command: RootCommand): void | Promise<void> {
    
    console.log(`Root command reported! options = ${JSON.stringify(options)}`);
    
    var config: ServerConfig;

    if (options.config) {
      config = options.config as ServerConfig;
    } else {
      config = new ServerConfig();
    }

    if (options.port) {
      config.port = options.port;
    }

    if (options.host) {
      config.host = options.host;
    }

    if (options.watch) {
      config.watch =  options.watch;
    }

    if (options.snapshots) {
      config.snapshots = options.snapshots;
    }

    if (options.id) {
      config.id = options.id;
    }

    config.routes =  options.routes;
    config.middlewares = options.middlewares;
    config.static = options.static;
    config.readOnly = options.readOnly;
    config.delay = options.delay;
    config.quiet = options.quiet;

    const jsonServer = new JsonServer(source, config);
    jsonServer.start();
  }
}
