import 'aurelia-polyfills';
import 'reflect-metadata';
import { Container } from 'aurelia-dependency-injection';
import { RootCommand } from './commands/root-command';

new Container().makeGlobal();

main();

function main() {
  const rootCommand: RootCommand = Container.instance.get(RootCommand);
}