"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var helper_1 = require("../../helper");
var git_1 = require("../../helper/git");
var locals_1 = tslib_1.__importDefault(require("./locals"));
var constant_1 = require("./constant");
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
        var commitMessage, localStatus, answers, choices_1, answers, findType, commitType;
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
                                message: locals_1.default.t('localStatusConfirm'),
                            },
                        ])];
                case 1:
                    answers = _a.sent();
                    if (answers.confirm) {
                        shelljs_1.default.exec('git add .');
                    }
                    else {
                        helper_1.print(locals_1.default.t('localStatusWarning'), 'warning');
                        shelljs_1.default.exit(1);
                    }
                    _a.label = 2;
                case 2:
                    shelljs_1.default.exec("git commit -m '" + commitMessage + "'");
                    helper_1.print(locals_1.default.t('commitSuccess'), 'success');
                    return [3 /*break*/, 5];
                case 3:
                    helper_1.print(locals_1.default.t('currentBranchDesc') + chalk_1.default.green(git_1.getCurentBranchName()));
                    choices_1 = [];
                    Object.keys(constant_1.COMMIT_TYPES).forEach(function (name) {
                        choices_1.push(constant_1.COMMIT_TYPES[name].description);
                    });
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'list',
                                name: 'type',
                                message: locals_1.default.t('selectTypeMsg'),
                                choices: choices_1,
                            },
                            {
                                type: 'input',
                                name: 'scope',
                                message: locals_1.default.t('inputScopeMsg'),
                                default: '',
                            },
                            {
                                type: 'input',
                                name: 'message',
                                message: locals_1.default.t('inputDescMsg'),
                            },
                        ])];
                case 4:
                    answers = _a.sent();
                    if (answers.message) {
                        findType = function (desc) {
                            var type = '';
                            Object.values(constant_1.COMMIT_TYPES).forEach(function (props) {
                                if (props.description === desc)
                                    type = props.name;
                            });
                            return type;
                        };
                        commitType = findType(answers.type);
                        commit(answers.message, commitType, answers.scope);
                    }
                    else {
                        helper_1.handleError(locals_1.default.t('commitError'));
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = commit;
