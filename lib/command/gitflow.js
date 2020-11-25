"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitflow = exports.finish = exports.start = exports.init = void 0;
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var helper_1 = require("../helper");
var chalk_1 = tslib_1.__importDefault(require("../helper/chalk"));
var git_1 = require("../helper/git");
/**
 * 创建分支
 * @param target 目标分支名
 * @param source 来源分支名
 */
function checkoutBranch(target, source) {
    shelljs_1.default.exec("git checkout -b " + target + " " + source);
    shelljs_1.default.echo(chalk_1.default.success("Biu: create the \"" + target + "\" branch successfully"));
}
/**
 * 合并分支
 * @param target 目标分支名
 * @param source 来源分支名
 * @throws 抛出合并错误
 */
function mergeBranch(target, source) {
    if (shelljs_1.default.exec("git merge --no-ff " + source, { silent: true }).stderr) {
        helper_1.handleError("an error occurred while merging the \"" + source + "\" branch to \"master\" branch");
    }
    shelljs_1.default.exec("git push origin " + target);
    shelljs_1.default.echo(chalk_1.default.success("Biu: merged the \"" + source + "\" branch to \"" + target + "\" branch"));
}
/**
 * 在完成操作后删除分支
 * @param branchName 分支名
 */
function deleteBranchAfterFinishd(branchName) {
    shelljs_1.default.exec("git branch -d " + branchName);
    shelljs_1.default.echo(chalk_1.default.success("Biu: finished the \"" + branchName + "\" workflow successfully"));
}
/**
 * 推送 Tag
 * @param tagName tag 名称
 * @param message 备注信息
 */
function pushTag(tagName, message) {
    shelljs_1.default.exec("git tag " + tagName + " -m \"" + message + "\"");
    shelljs_1.default.exec("git push origin " + tagName);
    shelljs_1.default.echo(chalk_1.default.success("Biu: tag " + tagName + " was pushed success"));
}
/**
 * 初始化仓库，创建 develop 分支
 */
function init() {
    git_1.checkLocalStatus();
    var localBranches = git_1.getLocalBranches();
    if (!localBranches.includes('develop')) {
        var remoteBranches = git_1.getRemoteBranches();
        if (remoteBranches.includes('develop')) {
            shelljs_1.default.exec('git pull');
        }
        else {
            if (git_1.getCurentBranchName() !== 'master') {
                shelljs_1.default.exec('git checkout master');
            }
            shelljs_1.default.exec('git pull');
            shelljs_1.default.exec('git checkout -b develop master');
        }
        shelljs_1.default.echo(chalk_1.default.success('Biu: the current repository initialized successfully'));
    }
    else {
        shelljs_1.default.echo(chalk_1.default.warning('Biu: the current repository has been initialized'));
    }
}
exports.init = init;
function start(type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git_1.checkLocalStatus();
                    if (!type) return [3 /*break*/, 1];
                    if (!name)
                        helper_1.handleError('invalid branch name');
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            checkoutBranch("feature/" + name, 'develop');
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('develop');
                            checkoutBranch("release/" + name, 'develop');
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            checkoutBranch("hotfix/" + name, 'master');
                            break;
                        default:
                            helper_1.handleError("unknown type \"" + type + "\"");
                            break;
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Please choose a gitflow type.',
                            choices: ['feature', 'release', 'hotfix'],
                        },
                        {
                            type: 'input',
                            name: 'name',
                            message: "Please enter the branch name.",
                        },
                    ])];
                case 2:
                    answers = _a.sent();
                    start(answers.type, answers.name);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.start = start;
function finish(type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var gitflow_1, localBranches, choices_1, answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git_1.checkLocalStatus();
                    if (!type) return [3 /*break*/, 1];
                    if (!name)
                        helper_1.handleError('invalid branch name');
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', "feature/" + name);
                            deleteBranchAfterFinishd("feature/" + name);
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', "release/" + name);
                            git_1.pullRemoteBranch('master');
                            mergeBranch('master', "release/" + name);
                            pushTag("v" + name, "release " + name);
                            deleteBranchAfterFinishd("release/" + name);
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            mergeBranch('master', "hotfix/" + name);
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', "hotfix/" + name);
                            pushTag("v" + helper_1.getProjectVersion(), "hotfix " + name);
                            deleteBranchAfterFinishd("hotfix/" + name);
                            break;
                        default:
                            helper_1.handleError("unknown type \"" + type + "\"");
                            break;
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Please choose the gitflow type.',
                            choices: ['feature', 'release', 'hotfix'],
                        },
                    ])];
                case 2:
                    gitflow_1 = _a.sent();
                    localBranches = git_1.getLocalBranches();
                    choices_1 = [];
                    localBranches.forEach(function (branch) {
                        if (new RegExp("^" + gitflow_1.type + "/").test(branch)) {
                            choices_1.push(branch.substring(gitflow_1.type.length + 1));
                        }
                    });
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'list',
                                name: 'name',
                                message: 'Please choose the completed branch.',
                                choices: choices_1,
                            },
                        ])];
                case 3:
                    answers = _a.sent();
                    finish(gitflow_1.type, answers.name);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.finish = finish;
function gitflow(mode) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mode) return [3 /*break*/, 1];
                    helper_1.handleError("unknown mode \"" + mode + "\"");
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Please choose a gitflow mode.',
                            choices: ['init', 'start', 'finish'],
                        },
                    ])];
                case 2:
                    answers = _a.sent();
                    switch (answers.type) {
                        case 'start':
                            return [2 /*return*/, start()];
                        case 'finish':
                            return [2 /*return*/, finish()];
                        case 'init':
                            return [2 /*return*/, init()];
                        default:
                            break;
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.gitflow = gitflow;
exports.default = {
    init: init,
    start: start,
    finish: finish,
    run: gitflow,
};
