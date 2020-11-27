"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
var git_1 = require("../../helper/git");
var main_1 = require("./main");
require("../../config");
exports.defaultConfig = {
    upstream: 'origin',
    perfix: {
        feature: 'feature',
        hotfix: 'hotfix',
        release: 'release',
    },
};
function default_1(program, config) {
    var gitflowConfig = Object.assign({}, exports.defaultConfig, config);
    console.log(gitflowConfig);
    program
        .command('gitflow [mode]')
        .alias('gf')
        .usage('gitflow|gf <init|start|finish> [options]')
        .description('创建 gitflow 工作流')
        .option('-f, --feature <name>', 'feature/ 前缀的分支名')
        .option('-r, --release <name>', 'release/ 前缀的分支名')
        .option('-x, --hotfix <name>', 'hotfix/ 前缀的分支名')
        .action(function (mode, options) {
        git_1.checkGit();
        var gitFlowType = ['feature', 'release', 'hotfix'].find(function (type) { return type in options; });
        switch (mode) {
            case 'init':
                main_1.init();
                break;
            case 'start':
                if (gitFlowType) {
                    main_1.start(gitFlowType, options[gitFlowType]);
                }
                else {
                    main_1.start();
                }
                break;
            case 'finish':
                if (gitFlowType) {
                    main_1.finish(gitFlowType, options[gitFlowType]);
                }
                else {
                    main_1.finish();
                }
                break;
            default:
                main_1.gitflow(mode);
                break;
        }
    });
}
exports.default = default_1;