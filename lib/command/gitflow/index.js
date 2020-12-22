"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var git_1 = require("../../helper/git");
var main_1 = require("./main");
var config_1 = require("./config");
var locals_1 = tslib_1.__importDefault(require("./locals"));
function default_1(program, gitflowConfig) {
    var config = Object.assign({}, config_1.defaultConfig, gitflowConfig);
    program
        .command('gitflow [mode]')
        .alias('gf')
        .usage('gitflow|gf <init|start|finish> [options]')
        .description(locals_1.default.t('commandDesc'))
        .option('-f, --feature <name>', locals_1.default.t('subCommandDesc', {
        prefix: config.prefix.feature,
    }))
        .option('-r, --release <name>', locals_1.default.t('subCommandDesc', {
        prefix: config.prefix.release,
    }))
        .option('-x, --hotfix <name>', locals_1.default.t('subCommandDesc', {
        prefix: config.prefix.hotfix,
    }))
        .action(function (mode, options) {
        git_1.checkGit();
        var gitFlowType = ['feature', 'release', 'hotfix'].find(function (type) { return type in options; });
        switch (mode) {
            case 'init':
                main_1.init(config.upstream);
                break;
            case 'start':
                if (gitFlowType) {
                    main_1.start(config.upstream, config.prefix, gitFlowType, options[gitFlowType]);
                }
                else {
                    main_1.start(config.upstream, config.prefix);
                }
                break;
            case 'finish':
                if (gitFlowType) {
                    main_1.finish(config.upstream, config.prefix, gitFlowType, options[gitFlowType]);
                }
                else {
                    main_1.finish(config.upstream, config.prefix);
                }
                break;
            default:
                main_1.gitflow(mode, config.upstream, config.prefix);
                break;
        }
    });
}
exports.default = default_1;
