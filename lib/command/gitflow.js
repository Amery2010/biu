"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
// import { prompt } from 'inquirer'
// import { handleError } from '../helper'
var chalk_1 = tslib_1.__importDefault(require("../helper/chalk"));
var git_1 = require("../helper/git");
/**
 * 检查本地是否存在未提交的
 */
function checkLocalStatus() {
    var localStatus = git_1.getLocalStatus();
    console.log('checkLocalStatus', localStatus);
    shelljs_1.default.exit(1);
    // if (localStatus.length > 0) {
    //   console.log(localStatus)
    //   shelljs.echo(localStatus.join('\n'))
    //   handleError('Biu: please commit locally modified files or checkout first')
    // }
}
/**
 * 初始化仓库，创建 develop 分支
 */
function init() {
    checkLocalStatus();
    var localBranches = git_1.getLocalBranches();
    if (!localBranches.includes('develop')) {
        var remoteBranches = git_1.getRemoteBranches();
        if (remoteBranches.includes('develop')) {
            shelljs_1.default.exec('git pull');
        }
        else {
            shelljs_1.default.exec('git checkout master');
            shelljs_1.default.exec('git pull');
            shelljs_1.default.exec('git checkout -b develop master');
        }
        shelljs_1.default.echo(chalk_1.default.success('Biu: the current repository initialized successfully'));
    }
    else {
        shelljs_1.default.echo(chalk_1.default.warning('Biu: the current repository has been initialized'));
    }
}
function start(type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (type) {
                console.log(type, name);
            }
            else {
                // select type
            }
            return [2 /*return*/];
        });
    });
}
function finish(type, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (type) {
                console.log(type, name);
            }
            else {
                // select type
            }
            return [2 /*return*/];
        });
    });
}
function gitflow(mode) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (mode) {
                shelljs_1.default.echo(chalk_1.default.error("Biu: Unknown mode '" + mode + "'"));
            }
            else {
                console.log('select mode');
            }
            return [2 /*return*/];
        });
    });
}
exports.default = {
    init: init,
    start: start,
    finish: finish,
    run: gitflow,
};
