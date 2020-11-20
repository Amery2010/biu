#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var commander_1 = require("commander");
var deploy_1 = tslib_1.__importDefault(require("./command/deploy"));
var commit_1 = tslib_1.__importDefault(require("./command/commit"));
var gitflow_1 = tslib_1.__importDefault(require("./command/gitflow"));
// import { getLocalStatus } from './helper/git'
var constant_1 = require("./constant");
var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../package.json'), 'utf-8'));
commander_1.program.version(pkg.version);
commander_1.program
    .command('deploy [env]')
    .alias('dp')
    .usage('deploy|dp [options] dev|rc|prod')
    .description('项目部署指令')
    .option('-d, --date [tpl]', '日期格式', 'MMDDHHmm')
    .option('-v <version>', '项目版本号')
    .option('--init <url>', 'upstream 仓库地址')
    .action(function (env, options) {
    if (options.init) {
        deploy_1.default.init(options.init);
    }
    else {
        deploy_1.default.run(env, options.date, options.v);
    }
});
commander_1.program
    .command('commit [message]')
    .alias('cm')
    .description('git 提交指令')
    .option("-" + constant_1.COMMIT_TYPES.feat.alias + ", --" + constant_1.COMMIT_TYPES.feat.name + " [scope]", constant_1.COMMIT_TYPES.feat.description)
    .option("-" + constant_1.COMMIT_TYPES.fix.alias + ", --" + constant_1.COMMIT_TYPES.fix.name + " [scope]", constant_1.COMMIT_TYPES.fix.description)
    .option("-" + constant_1.COMMIT_TYPES.style.alias + ", --" + constant_1.COMMIT_TYPES.style.name + " [scope]", constant_1.COMMIT_TYPES.style.description)
    .option("-" + constant_1.COMMIT_TYPES.refactor.alias + ", --" + constant_1.COMMIT_TYPES.refactor.name + " [scope]", constant_1.COMMIT_TYPES.refactor.description)
    .option("-" + constant_1.COMMIT_TYPES.perf.alias + ", --" + constant_1.COMMIT_TYPES.perf.name + " [scope]", constant_1.COMMIT_TYPES.perf.description)
    .option("-" + constant_1.COMMIT_TYPES.test.alias + ", --" + constant_1.COMMIT_TYPES.test.name + " [scope]", constant_1.COMMIT_TYPES.test.description)
    .option("-" + constant_1.COMMIT_TYPES.docs.alias + ", --" + constant_1.COMMIT_TYPES.docs.name + " [scope]", constant_1.COMMIT_TYPES.docs.description)
    .option("-" + constant_1.COMMIT_TYPES.merge.alias + ", --" + constant_1.COMMIT_TYPES.merge.name + " [scope]", constant_1.COMMIT_TYPES.merge.description)
    .option("-" + constant_1.COMMIT_TYPES.revert.alias + ", --" + constant_1.COMMIT_TYPES.revert.name + " [scope]", constant_1.COMMIT_TYPES.revert.description)
    .option("-" + constant_1.COMMIT_TYPES.build.alias + ", --" + constant_1.COMMIT_TYPES.build.name + " [scope]", constant_1.COMMIT_TYPES.build.description)
    .option("-" + constant_1.COMMIT_TYPES.chore.alias + ", --" + constant_1.COMMIT_TYPES.chore.name + " [scope]", constant_1.COMMIT_TYPES.chore.description)
    .option("-" + constant_1.COMMIT_TYPES.other.alias + ", --" + constant_1.COMMIT_TYPES.other.name + " [scope]", constant_1.COMMIT_TYPES.other.description)
    .action(function (message, options) {
    var commitType = Object.keys(constant_1.COMMIT_TYPES).find(function (name) { return name in options; });
    if (commitType) {
        commit_1.default(message, commitType, options[commitType]);
    }
    else {
        commit_1.default(message);
    }
});
commander_1.program
    .command('gitflow [mode]')
    .alias('gf')
    .usage('gitflow|gf [options] init|start|finish')
    .description('创建 gitflow 工作流')
    .option('-f, --feature <name>', 'feature/ 前缀的分支名')
    .option('-x, --hotfix <name>', 'hotfix/ 前缀的分支名')
    .option('-r, --release <name>', 'release/ 前缀的分支名')
    .action(function (mode, options) {
    var gitFlowType = ['feature', 'hotfix', 'release'].find(function (type) { return type in options; });
    switch (mode) {
        case 'init':
            gitflow_1.default.init();
            break;
        case 'start':
            if (gitFlowType) {
                gitflow_1.default.start(gitFlowType, options[gitFlowType]);
            }
            else {
                gitflow_1.default.start();
            }
            break;
        case 'finish':
            if (gitFlowType) {
                gitflow_1.default.finish(gitFlowType, options[gitFlowType]);
            }
            else {
                gitflow_1.default.finish();
            }
            break;
        default:
            gitflow_1.default.run(mode);
            break;
    }
});
// program.command('test').action(() => {
//   console.log(getLocalStatus())
// })
commander_1.program.parse(process.argv);
