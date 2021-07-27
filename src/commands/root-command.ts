import { autoinject } from 'aurelia-dependency-injection';
import { singleton } from 'aurelia-dependency-injection';
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
      .option("-c, --config <config file>", "Path to config file")
      .option("-p, --port <port number>", "Set port")
      .option("-w, --watch", "Watch file(s)")
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

    if (options.watch) {
      config.watch =  options.watch;
    }

    const jsonServer = new JsonServer(source, config);
    jsonServer.start();
  }
}
