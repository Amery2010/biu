"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = exports.init = void 0;
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var helper_1 = require("../../helper");
var git_1 = require("../../helper/git");
/**
 * 获取格式化的日期
 * @param tpl 日期格式模板
 * @returns 格式化的日期
 */
function getDateString(tpl) {
    return dayjs_1.default().format(tpl);
}
/**
 * 获取 Tag 文本
 * @param env 部署环境，仅限于 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 * @returns Tag 文本
 */
function getTagString(env, dateTpl, version) {
    return "deploys/" + env + "/" + (version ? "v" + version + "_" : '') + getDateString(dateTpl);
}
/**
 * 初始化项目的 `upstream` 仓库
 * @param url 仓库地址
 */
function init(url) {
    var remotes = git_1.getRemotes();
    if (remotes.includes('upstream')) {
        helper_1.print('the upstream remote already exists', 'warning');
    }
    else {
        helper_1.print('start to initialize the project upstream...');
        shelljs_1.default.exec("git remote add upstream " + url);
        helper_1.print('the upstream remote is added successfully', 'success');
    }
}
exports.init = init;
/**
 * 同步分支
 * @param branchName 分支名
 */
function syncBranch(branchName) {
    if (!git_1.getRemotes().includes('upstream')) {
        helper_1.handleError('cannot find `upstream` remote, please set up `upstream` remote first.\n biu dp --init <url>');
    }
    helper_1.print("pull upstream " + branchName + " branch...");
    if (git_1.getCurentBranchName() !== branchName) {
        shelljs_1.default.exec("git fetch upstream " + branchName);
        shelljs_1.default.exec("git checkout -b " + branchName + " upstream/" + branchName);
        shelljs_1.default.exec("git pull upstream " + branchName);
    }
    else {
        shelljs_1.default.exec("git pull upstream " + branchName);
    }
}
/**
 * 将 Tag 推送到 `upstream` 仓库
 * @param tagName 标签名
 */
function pushTagToUpstream(tagName) {
    helper_1.print('push tag to upstream...');
    shelljs_1.default.exec("git tag " + tagName);
    shelljs_1.default.exec("git push upstream " + tagName);
    helper_1.print(tagName + " was pushed success", 'success');
}
/**
 * 部署项目指令
 * @param env 部署环境，仅限于  `develop`、`release` 和 `production`，以及别名 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 */
function deploy(env, dateTpl, version) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, answers, answers_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = env;
                    switch (_a) {
                        case 'dev': return [3 /*break*/, 1];
                        case 'develop': return [3 /*break*/, 1];
                        case 'rc': return [3 /*break*/, 2];
                        case 'release': return [3 /*break*/, 2];
                        case 'prod': return [3 /*break*/, 3];
                        case 'production': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    pushTagToUpstream(getTagString('dev', dateTpl, version));
                    return [3 /*break*/, 9];
                case 2:
                    syncBranch('develop');
                    pushTagToUpstream(getTagString('rc', dateTpl, version));
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: 'Are you sure to deploy to the production environment?',
                            default: false,
                        },
                    ])];
                case 4:
                    answers = _b.sent();
                    if (answers.confirm) {
                        syncBranch('master');
                        pushTagToUpstream(getTagString('prod', dateTpl, version));
                    }
                    else {
                        helper_1.print('you canceled the command to deploy to the production environment', 'warning');
                    }
                    return [3 /*break*/, 9];
                case 5:
                    if (!env) return [3 /*break*/, 6];
                    helper_1.handleError("unknown env \"" + env + "\"");
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Please select the environment you want to deploy.',
                            choices: ['develop', 'release', 'production'],
                            default: 'develop',
                        },
                    ])];
                case 7:
                    answers_1 = _b.sent();
                    deploy(answers_1.type, dateTpl, version);
                    _b.label = 8;
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.deploy = deploy;
