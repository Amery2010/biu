#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var commander_1 = require("commander");
var deploy_1 = tslib_1.__importDefault(require("./deploy"));
var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../package.json'), 'utf-8'));
commander_1.program.version(pkg.version);
commander_1.program
    .command('deploy [env]')
    .alias('dp')
    .description('project deployment command')
    .option('-d, --date [tpl]', 'tag date format', 'MMDDHHmm')
    .option('--init <url>', 'git upstream url')
    .action(function (env, options) {
    if (options.init) {
        deploy_1.default.init(options.init);
    }
    else {
        deploy_1.default.run(env, options.date);
    }
});
commander_1.program.parse(process.argv);
