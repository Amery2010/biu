#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var commander_1 = require("commander");
var config_1 = tslib_1.__importDefault(require("./config"));
var deploy_1 = tslib_1.__importDefault(require("./command/deploy"));
var commit_1 = tslib_1.__importDefault(require("./command/commit"));
var gitflow_1 = tslib_1.__importDefault(require("./command/gitflow"));
var helper_1 = require("./helper");
var pkg = helper_1.readFileData(path_1.default.resolve(__dirname, '../package.json'));
commander_1.program.version(pkg.version);
deploy_1.default(commander_1.program, config_1.default);
commit_1.default(commander_1.program, config_1.default);
gitflow_1.default(commander_1.program, config_1.default);
commander_1.program.parse(process.argv);
