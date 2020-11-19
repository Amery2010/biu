"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var chalk_1 = tslib_1.__importDefault(require("../helper/chalk"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var helper_1 = require("../helper");
var git_1 = require("../helper/git");
/**
 * get tag date format
 * @param tpl tag date format template
 * @returns tag date format
 */
function getDateString(tpl) {
    return dayjs_1.default().format(tpl);
}
/**
 * get tag string
 * @param env deployment environment, limited to `dev`, `rc` and `prod`
 * @param dateTpl tag date format template
 * @param version project version
 * @returns tag string
 */
function getTagString(env, dateTpl, version) {
    return "deploys/" + env + "/" + (version ? "v" + version + "_" : '') + getDateString(dateTpl);
}
/**
 * initialize the project upstream
 * @param url project upstream url
 */
function init(url) {
    var remotes = git_1.getRemotes();
    if (remotes.includes('upstream')) {
        shelljs_1.default.echo(chalk_1.default.warning('Biu: the upstream remote already exists'));
    }
    else {
        shelljs_1.default.echo('Biu: start to initialize the project upstream...');
        shelljs_1.default.exec("git remote add upstream " + url);
        shelljs_1.default.echo(chalk_1.default.success('Biu: the upstream remote is added successfully'));
    }
}
function syncBranch(branchName) {
    if (!git_1.getRemotes().includes('upstream')) {
        helper_1.handleError('cannot find `upstream` remote, please set up `upstream` remote first.\n biu dp --init <url>');
    }
    shelljs_1.default.echo("Biu: pull upstream " + branchName + " branch...");
    if (git_1.getCurentBranchName() !== branchName) {
        shelljs_1.default.exec("git fetch upstream " + branchName);
        shelljs_1.default.exec("git checkout -b " + branchName + " upstream/" + branchName);
        shelljs_1.default.exec("git pull upstream " + branchName);
    }
    else {
        shelljs_1.default.exec("git pull upstream " + branchName);
    }
}
function pushTagToUpstream(tagName) {
    shelljs_1.default.echo('Biu: push tag to upstream...');
    shelljs_1.default.exec("git tag " + tagName);
    shelljs_1.default.exec("git push upstream " + tagName);
    shelljs_1.default.echo(chalk_1.default.success("Biu: " + tagName + " was pushed success"));
}
/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 * @param version project version
 */
function deploy(env, dateTpl, version) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, confirm, confirm_1;
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
                            name: 'deployConfirm',
                            message: 'Are you sure to deploy to the production environment?',
                            default: false,
                        },
                    ])];
                case 4:
                    confirm = _b.sent();
                    if (confirm.deployConfirm) {
                        syncBranch('master');
                        pushTagToUpstream(getTagString('prod', dateTpl, version));
                    }
                    else {
                        shelljs_1.default.echo(chalk_1.default.warning('Biu: you canceled the command to deploy to the production environment'));
                    }
                    return [3 /*break*/, 9];
                case 5:
                    if (!env) return [3 /*break*/, 6];
                    helper_1.handleError("unknown env '" + env + "'");
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Please select the environment you want to deploy.',
                            choices: ['develop', 'release', 'production', 'exit'],
                            default: 'develop',
                        },
                    ])];
                case 7:
                    confirm_1 = _b.sent();
                    if (confirm_1.type === 'exit') {
                        shelljs_1.default.echo(chalk_1.default.warning('Biu: you canceled the deployment command'));
                        shelljs_1.default.exit(1);
                    }
                    else {
                        deploy(confirm_1.type, dateTpl, version);
                    }
                    _b.label = 8;
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    init: init,
    run: deploy,
};
