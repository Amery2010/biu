"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var chalk_1 = tslib_1.__importDefault(require("./helper/chalk"));
var constant_1 = require("./constant");
/**
 * generate commit message
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 * @returns formatted commit message
 */
function generateCommitMessage(message, type, scope) {
    if (type) {
        return "" + type + (scope ? "(" + scope + ")" : '') + ": " + message;
    }
    return message;
}
/**
 * git commit command
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 */
function commit(message, type, scope) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var commitMessage, choices_1, confirm, commitType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commitMessage = generateCommitMessage(message, type, scope);
                    if (!commitMessage) return [3 /*break*/, 1];
                    shelljs_1.default.exec('git add .');
                    shelljs_1.default.exec("git commit -m '" + commitMessage + "'");
                    shelljs_1.default.echo(chalk_1.default.success('Biu: commit message success'));
                    return [3 /*break*/, 3];
                case 1:
                    choices_1 = [];
                    Object.keys(constant_1.COMMIT_TYPES).forEach(function (name) {
                        choices_1.push(name.padEnd(15, ' ') + constant_1.COMMIT_TYPES[name].description);
                    });
                    return [4 /*yield*/, inquirer_1.prompt([
                            {
                                type: 'list',
                                name: 'type',
                                message: 'Please select commit type.',
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
                case 2:
                    confirm = _a.sent();
                    if (confirm.message) {
                        commitType = confirm.type.split(' ')[0];
                        commit(confirm.message, commitType, confirm.scope);
                    }
                    else {
                        shelljs_1.default.echo(chalk_1.default.error('Biu: commit message is required!'));
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = commit;
