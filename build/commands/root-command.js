"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootCommand = void 0;
const aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
const aurelia_dependency_injection_2 = require("aurelia-dependency-injection");
const commander_1 = require("commander");
let RootCommand = class RootCommand extends commander_1.Command {
    constructor() {
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
    run(name, options, command) {
        console.log("Root command reported!");
    }
};
RootCommand = __decorate([
    aurelia_dependency_injection_1.autoinject,
    aurelia_dependency_injection_2.singleton(),
    __metadata("design:paramtypes", [])
], RootCommand);
exports.RootCommand = RootCommand;
