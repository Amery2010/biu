"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var inquirer_1 = require("inquirer");
var chalk_1 = tslib_1.__importDefault(require("./helper/chalk"));
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
/**
 * get tag date format
 * @param tpl tag date format template
 * @returns tag date format
 */
function getDateString(tpl) {
    return dayjs_1.default().format(tpl);
}
function getTagString(env, dateTpl, version) {
    return "deploys/" + env + "/" + (version ? "v" + version + "_" : '') + getDateString(dateTpl);
}
function init(url) {
    shelljs_1.default.echo('Biu: start to initialize the project branch...');
    shelljs_1.default.exec("git remote add upstream " + url);
    shelljs_1.default.echo(chalk_1.default.success('Biu: the upstream remote is added successfully'));
}
/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 */
function deploy(env, dateTpl, version) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tagName, _a, confirm;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tagName = '';
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
                    tagName = getTagString('dev', dateTpl, version);
                    shelljs_1.default.echo('Biu: push tag to upstream...');
                    shelljs_1.default.exec("git tag " + tagName + " -m 'build: Deploy to development environment'");
                    shelljs_1.default.exec("git push upstream " + tagName);
                    shelljs_1.default.echo(chalk_1.default.success("Biu: " + tagName + " was pushed success"));
                    return [3 /*break*/, 6];
                case 2:
                    tagName = getTagString('rc', dateTpl, version);
                    shelljs_1.default.echo('Biu: pull upstream master branch...');
                    shelljs_1.default.exec('git fetch upstream develop');
                    shelljs_1.default.exec('git checkout -b develop upstream/develop');
                    shelljs_1.default.exec('git pull upstream develop');
                    shelljs_1.default.echo('Biu: push tag to upstream...');
                    shelljs_1.default.exec("git tag " + tagName + " -m 'build: Deploy to release environment'");
                    shelljs_1.default.exec("git push upstream " + tagName);
                    shelljs_1.default.echo(chalk_1.default.success("Biu: " + tagName + " was pushed success"));
                    return [3 /*break*/, 6];
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
                        tagName = getTagString('prod', dateTpl, version);
                        shelljs_1.default.echo('Biu: pull upstream master branch...');
                        shelljs_1.default.exec('git fetch upstream master');
                        shelljs_1.default.exec('git checkout -b master upstream/master');
                        shelljs_1.default.exec('git pull upstream master');
                        shelljs_1.default.echo('Biu: push tag to upstream...');
                        shelljs_1.default.exec("git tag " + tagName + " -m 'build: Deploy to production environment'");
                        shelljs_1.default.exec("git push upstream " + tagName);
                        shelljs_1.default.echo(chalk_1.default.success("Biu: " + tagName + " was pushed success"));
                    }
                    else {
                        shelljs_1.default.echo(chalk_1.default.warning('Biu: You canceled the command to deploy to the production environment'));
                    }
                    return [3 /*break*/, 6];
                case 5:
                    shelljs_1.default.echo(chalk_1.default.error("Unknown env: " + env));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    init: init,
    run: deploy,
};
