"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("aurelia-polyfills");
require("reflect-metadata");
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const root_command_1 = require("./commands/root-command");
new aurelia_dependency_injection_1.Container().makeGlobal();
main();
function main() {
    const rootCommand = aurelia_dependency_injection_1.Container.instance.get(root_command_1.RootCommand);
}
