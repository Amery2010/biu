"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var helper_1 = require("../helper");
var git_1 = require("../helper/git");
var constant_1 = require("../constant");
/**
 * 生成提交信息
 * @param message 提交信息
 * @param type 提交类型
 * @param scope 提交范围
 * @returns 格式化后的提交信息
 */
function generateCommitMessage(message, type, scope) {
    if (type) {
        return "" + type + (scope ? "(" + scope + ")" : '') + ": " + message;
    }
    return message;
}
/**
 * git 提交指令
 * @param message 提交信息
 * @param type 提交类型
 * @param scope 提交范围
 */
function commit(message, type, scope) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var commitMessage, localStatus, answers, choices_1, answers, commitType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commitMessage = generateCommitMessage(message, type, scope);
                    if (!commitMessage) return [3 /*break*/, 3];
                    localStatus = git_1.getLocalStatus();
                    if (!(localStatus.length > 0)) return [3 /*break*/, 2];
                    shelljs_1.default.echo(localStatus.join('\n'));
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'confirm',
                                name: 'confirm',
                                message: 'Do you want to commit locally modified files?',
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    if (answers.confirm) {
                        shelljs_1.default.exec('git add .');
                    }
                    else {
                        helper_1.print('please commit locally modified files or checkout first', 'warning');
                        shelljs_1.default.exit(1);
                    }
                    _a.label = 2;
                case 2:
                    shelljs_1.default.exec("git commit -m '" + commitMessage + "'");
                    helper_1.print('commit message success', 'success');
                    return [3 /*break*/, 5];
                case 3:
                    helper_1.print(chalk_1.default.green("current branch is ") + chalk_1.default.red(git_1.getCurentBranchName()));
                    choices_1 = [];
                    Object.keys(constant_1.COMMIT_TYPES).forEach(function (name) {
                        choices_1.push(name.padEnd(15, ' ') + constant_1.COMMIT_TYPES[name].description);
                    });
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'list',
                                name: 'type',
                                message: 'Please choose a commit type.',
                                choices: choices_1,
                            },
                            {
                                type: 'input',
                                name: 'scope',
                                message: 'Please enter the commit scope.',
                                default: '',
                            },
                            {
                                type: 'input',
                                name: 'message',
                                message: 'Please enter the commit message.',
                            },
                        ])];
                case 4:
                    answers = _a.sent();
                    if (answers.message) {
                        commitType = answers.type.split(' ')[0];
                        commit(answers.message, commitType, answers.scope);
                    }
                    else {
                        helper_1.handleError('commit message is required!');
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function default_1(program) {
    program
        .command('commit [message]')
        .alias('cm')
        .usage('commit|cm <message> [options]')
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
        git_1.checkGit();
        var commitType = Object.keys(constant_1.COMMIT_TYPES).find(function (name) { return name in options; });
        if (commitType) {
            commit(message, commitType, options[commitType]);
        }
        else {
            commit(message);
        }
    });
}
exports.default = default_1;
