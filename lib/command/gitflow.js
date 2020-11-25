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
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            shelljs_1.default.exec("git checkout -b feature/" + name + " develop");
                            shelljs_1.default.echo(chalk_1.default.success("Biu: create the \"feature/" + name + "\" branch successfully"));
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            shelljs_1.default.exec("git checkout -b hotfix/" + name + " master");
                            shelljs_1.default.echo(chalk_1.default.success("Biu: create the \"hotfix/" + name + "\" branch successfully"));
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('develop');
                            shelljs_1.default.exec("git checkout -b release/" + name + " develop");
                            shelljs_1.default.echo(chalk_1.default.success("Biu: create the \"release/" + name + "\" branch successfully"));
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
                            choices: ['feature', 'hotfix', 'release'],
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
        var tagName, gitflow_1, localBranches, choices_1, answers;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git_1.checkLocalStatus();
                    if (!type) return [3 /*break*/, 1];
                    switch (type) {
                        case 'feature':
                            git_1.pullRemoteBranch('develop');
                            if (shelljs_1.default.exec("git merge --no-ff feature/" + name, { silent: true }).stderr) {
                                helper_1.handleError("an error occurred while merging the \"feature/" + name + "\" branch to \"develop\" branch");
                            }
                            shelljs_1.default.exec('git push origin develop');
                            shelljs_1.default.exec("git branch -d feature/" + name);
                            shelljs_1.default.echo(chalk_1.default.success("Biu: finished the \"feature/" + name + "\" workflow successfully"));
                            break;
                        case 'hotfix':
                            git_1.pullRemoteBranch('master');
                            if (shelljs_1.default.exec("git merge --no-ff hotfix/" + name, { silent: true }).stderr) {
                                helper_1.handleError("an error occurred while merging the \"hotfix/" + name + "\" branch to \"master\" branch");
                            }
                            shelljs_1.default.exec('git push origin master');
                            shelljs_1.default.echo(chalk_1.default.success("Biu: merged the \"hotfix/" + name + "\" branch to \"master\" branch"));
                            git_1.pullRemoteBranch('develop');
                            if (shelljs_1.default.exec("git merge --no-ff hotfix/" + name, { silent: true }).stderr) {
                                helper_1.handleError("an error occurred while merging the \"hotfix/" + name + "\" branch to \"develop\" branch");
                            }
                            shelljs_1.default.exec('git push origin develop');
                            shelljs_1.default.echo(chalk_1.default.success("Biu: merged the \"hotfix/" + name + "\" branch to \"develop\" branch"));
                            tagName = "v" + helper_1.getProjectVersion();
                            shelljs_1.default.exec("git tag " + tagName + " -m \"hotfix " + name + "\"");
                            shelljs_1.default.exec("git push origin " + tagName);
                            shelljs_1.default.echo(chalk_1.default.success("Biu: tag " + tagName + " was pushed success"));
                            shelljs_1.default.exec("git branch -d hotfix/" + name);
                            shelljs_1.default.echo(chalk_1.default.success("Biu: finished the \"hotfix/" + name + "\" workflow successfully"));
                            break;
                        case 'release':
                            git_1.pullRemoteBranch('master');
                            if (shelljs_1.default.exec("git merge --no-ff release/" + name, { silent: true }).stderr) {
                                helper_1.handleError("an error occurred while merging the \"release/" + name + "\" branch to \"master\" branch");
                            }
                            shelljs_1.default.exec('git push origin master');
                            shelljs_1.default.echo(chalk_1.default.success("Biu: merged the \"release/" + name + "\" branch to \"master\" branch"));
                            git_1.pullRemoteBranch('develop');
                            if (shelljs_1.default.exec("git merge --no-ff release/" + name, { silent: true }).stderr) {
                                helper_1.handleError("an error occurred while merging the \"release/" + name + "\" branch to \"develop\" branch");
                            }
                            shelljs_1.default.exec('git push origin develop');
                            shelljs_1.default.echo(chalk_1.default.success("Biu: merged the \"release/" + name + "\" branch to \"develop\" branch"));
                            shelljs_1.default.exec("git tag v" + name + " -m \"release v" + name + "\"");
                            shelljs_1.default.exec("git push origin v" + name);
                            shelljs_1.default.echo(chalk_1.default.success("Biu: tag v" + name + " was pushed success"));
                            shelljs_1.default.exec("git branch -d release/" + name);
                            shelljs_1.default.echo(chalk_1.default.success("Biu: finished the \"release/" + name + "\" workflow successfully"));
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
                            choices: ['feature', 'hotfix', 'release'],
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
