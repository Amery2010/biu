"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitflow = exports.finish = exports.start = exports.init = void 0;
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var helper_1 = require("../../helper");
var git_1 = require("../../helper/git");
var locals_1 = tslib_1.__importDefault(require("./locals"));
/**
 * 创建分支
 * @param target 目标分支名
 * @param source 来源分支名
 */
function checkoutBranch(target, source) {
    helper_1.print(locals_1.default.t('checkoutBranch', {
        target: target,
    }));
    shelljs_1.default.exec("git checkout -b " + target + " " + source);
    helper_1.print(locals_1.default.t('checkoutBranchSuccess', {
        target: target,
    }), 'success');
}
/**
 * 合并分支
 * @param target 目标分支名
 * @param source 来源分支名
 * @throws 抛出合并错误
 */
function mergeBranch(target, source) {
    helper_1.print(locals_1.default.t('mergeBranch', {
        target: target,
        source: source,
    }));
    if (shelljs_1.default.exec("git merge " + source).stderr) {
        helper_1.handleError(locals_1.default.t('mergeBranchError', {
            target: target,
            source: source,
        }));
    }
    shelljs_1.default.exec("git push origin " + target);
    helper_1.print(locals_1.default.t('mergeBranchSuccess', {
        target: target,
        source: source,
    }), 'success');
}
/**
 * 在完成操作后删除分支
 * @param branchName 分支名
 */
function cleanBranch(branchName) {
    helper_1.print(locals_1.default.t('cleanBranch', {
        branchName: branchName,
    }));
    shelljs_1.default.exec("git branch -d " + branchName);
    helper_1.print(locals_1.default.t('cleanBranchSuccess', {
        branchName: branchName,
    }), 'success');
}
/**
 * 推送 Tag
 * @param upstream 远端仓库名称
 * @param tagName tag 名称
 * @param message 备注信息
 */
function pushTag(tagName, message) {
    helper_1.print(locals_1.default.t('pushTag'));
    shelljs_1.default.exec("git tag " + tagName + " -m \"" + message + "\"");
    shelljs_1.default.exec("git push " + tagName);
    helper_1.print(locals_1.default.t('pushTahSuccess', {
        tagName: tagName,
    }), 'success');
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
            git_1.pullRemoteBranch('develop');
        }
        else {
            if (git_1.getCurentBranchName() !== 'master') {
                git_1.pullRemoteBranch('master');
            }
            shelljs_1.default.exec('git checkout -b develop master');
        }
        helper_1.print(locals_1.default.t('initRepo'), 'success');
    }
    else {
        helper_1.print(locals_1.default.t('initRepoWarning'), 'warning');
    }
}
exports.init = init;
/**
 * 开始 gitflow 工作流
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
function start(prefix, type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git_1.checkLocalStatus();
                    if (!type) return [3 /*break*/, 1];
                    if (!name)
                        helper_1.handleError(locals_1.default.t('missingBranchName'));
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            checkoutBranch(prefix.feature + "/" + name, 'develop');
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('develop');
                            checkoutBranch(prefix.release + "/" + name, 'develop');
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            checkoutBranch(prefix.hotfix + "/" + name, 'master');
                            break;
                        default:
                            helper_1.handleError(locals_1.default.t('unknownType', {
                                type: type,
                            }));
                            break;
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: locals_1.default.t('selectGitflowType'),
                            choices: ['feature', 'release', 'hotfix'],
                        },
                        {
                            type: 'input',
                            name: 'name',
                            message: locals_1.default.t('inputBranchName'),
                        },
                    ])];
                case 2:
                    answers = _a.sent();
                    start(prefix, answers.type, answers.name);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.start = start;
/**
 * 完成 gitflow 工作流
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
function finish(prefix, type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var gitflow_1, localBranches, choices_1, answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git_1.checkLocalStatus();
                    if (!type) return [3 /*break*/, 1];
                    if (!name)
                        helper_1.handleError(locals_1.default.t('missingBranchName'));
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', prefix.feature + "/" + name);
                            cleanBranch(prefix.feature + "/" + name);
                            helper_1.print(locals_1.default.t('finishedWorkflow', {
                                type: 'feature',
                            }), 'success');
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', prefix.release + "/" + name);
                            git_1.pullRemoteBranch('master');
                            mergeBranch('master', prefix.release + "/" + name);
                            pushTag("v" + name, prefix.release + " " + name);
                            cleanBranch(prefix.release + "/" + name);
                            helper_1.print(locals_1.default.t('finishedWorkflow', {
                                type: 'release',
                            }), 'success');
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            mergeBranch('master', prefix.hotfix + "/" + name);
                            git_1.pullRemoteBranch('develop');
                            mergeBranch('develop', prefix.hotfix + "/" + name);
                            pushTag("v" + helper_1.getProjectVersion(), prefix.hotfix + " " + name);
                            cleanBranch(prefix.hotfix + "/" + name);
                            helper_1.print(locals_1.default.t('finishedWorkflow', {
                                type: 'hotfix',
                            }), 'success');
                            break;
                        default:
                            helper_1.handleError(locals_1.default.t('unknownType', {
                                type: type,
                            }));
                            break;
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: locals_1.default.t('selectGitflowType'),
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
                                message: locals_1.default.t('selectFinishedBranch'),
                                choices: choices_1,
                            },
                        ])];
                case 3:
                    answers = _a.sent();
                    finish(prefix, gitflow_1.type, answers.name);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.finish = finish;
/**
 * 选择 gitflow 工作流
 * @param mode gitflow 类型
 * @param prefix 分支前缀
 */
function gitflow(mode, prefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!mode) return [3 /*break*/, 1];
                    helper_1.handleError(locals_1.default.t('unknownMode', {
                        mode: mode,
                    }));
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: locals_1.default.t('selectGitflowMode'),
                            choices: ['start', 'finish', 'init'],
                        },
                    ])];
                case 2:
                    answers = _a.sent();
                    switch (answers.type) {
                        case 'start':
                            return [2 /*return*/, start(prefix)];
                        case 'finish':
                            return [2 /*return*/, finish(prefix)];
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
