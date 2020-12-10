"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var git_1 = require("../../helper/git");
var main_1 = require("./main");
var config_1 = require("./config");
var locals_1 = tslib_1.__importDefault(require("./locals"));
function default_1(program, deployConfig) {
    var config = Object.assign({}, config_1.defaultConfig, deployConfig);
    program
        .command('deploy [env]')
        .alias('dp')
        .usage('deploy|dp <dev|rc|prod> [options]')
        .description(locals_1.default.t('commandDesc'))
        .option('-d, --date [tpl]', locals_1.default.t('commandDateTpl'), config.dataTpl)
        .option('-v <version>', locals_1.default.t('commandVersion'))
        .option('--init <url>', locals_1.default.t('commandUpstreamUrl'))
        .action(function (env, options) {
        git_1.checkGit();
        if (options.init) {
            main_1.init(options.init, config);
        }
        else {
            main_1.deploy(env, options.date, options.v, config);
        }
    });
}
exports.default = default_1;
