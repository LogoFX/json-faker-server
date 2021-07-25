import { autoinject, Container } from 'aurelia-dependency-injection';
import { singleton } from 'aurelia-dependency-injection';
import { Command } from "commander";
import { JsonServer } from '../server';

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
      .arguments('<sourse>')
      // .addCommand(generateCommand)
      // .addCommand(serveCommand)
      // af api.yaml [--output ../test/bama-base]
      //    data [path] --meetings 20 --tasks 200
      //.option()
      // .addCommand(new Help(), { isDefault: true })
      // .addCommand(new New())
      // .addCommand(new Enhance())
      .action(this.run);


    this.parse(process.argv);
  }

  private run(source: string, options: any, command: RootCommand): void | Promise<void> {
    console.log("Root command reported!");
    var jsonServer = new JsonServer({Source: source});
    jsonServer.Start();
  }
}
