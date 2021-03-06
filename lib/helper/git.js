"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.pullRemoteBranch = exports.checkLocalStatus = exports.getLocalStatus = exports.getRemotes = exports.getRemoteBranches = exports.getLocalBranches = exports.getCurentBranchName = exports.checkGit = void 0;
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var index_1 = require("./index");
var locals_1 = tslib_1.__importDefault(require("../locals"));
/**
 * 检查系统是否已经安装 git
 * @throws 提示用户需要安装 git
 */
function checkGit() {
    if (!shelljs_1.default.which('git')) {
        index_1.handleError(locals_1.default.t('needGit'));
    }
}
exports.checkGit = checkGit;
/**
 * 获取当前分支名
 * @returns 当前分支名
 */
function getCurentBranchName() {
    return shelljs_1.default.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).toString().trim();
}
exports.getCurentBranchName = getCurentBranchName;
/**
 * 获取本地分支列表
 * @returns 本地分支列表
 */
function getLocalBranches() {
    var raw = shelljs_1.default.exec('git branch', { silent: true }).toString().trim();
    var branches = raw !== '' ? raw.split('\n') : [];
    return branches.map(function (branchName) {
        if (/\*/.test(branchName)) {
            return branchName.replace('* ', '').trim();
        }
        else {
            return branchName.trim();
        }
    });
}
exports.getLocalBranches = getLocalBranches;
/**
 * 获取远端分支列表
 * @returns 远端分支列表
 */
function getRemoteBranches() {
    var raw = shelljs_1.default.exec('git branch -r', { silent: true }).toString().trim();
    var branches = raw !== '' ? raw.split('\n') : [];
    return branches.map(function (branchName) {
        if (/->/.test(branchName)) {
            return branchName.split('->')[0].trim();
        }
        else {
            return branchName.trim();
        }
    });
}
exports.getRemoteBranches = getRemoteBranches;
/**
 * 获取远端仓库列表
 * @returns 远端仓库列表
 */
function getRemotes() {
    var raw = shelljs_1.default.exec('git remote', { silent: true }).toString().trim();
    var remotes = raw !== '' ? raw.split('\n') : [];
    return remotes.map(function (remoteName) { return remoteName.trim(); });
}
exports.getRemotes = getRemotes;
/**
 * 获取本地文件状态
 * @returns 本地文件状态列表
 */
function getLocalStatus() {
    var raw = shelljs_1.default.exec('git status --porcelain', { silent: true }).toString().trim();
    var fileStatus = raw !== '' ? raw.split('\n') : [];
    return fileStatus.map(function (status) { return status.trim().split(' '); });
}
exports.getLocalStatus = getLocalStatus;
/**
 * 检查本地是否存在未提交的
 */
function checkLocalStatus() {
    var localStatus = getLocalStatus();
    if (localStatus.length > 0) {
        shelljs_1.default.echo(localStatus.join('\n'));
        index_1.handleError(locals_1.default.t('checkLocalStatusError'));
    }
}
exports.checkLocalStatus = checkLocalStatus;
/**
 * 拉取远端分支内容到本地
 * @param branchName 分支名
 */
function pullRemoteBranch(branchName) {
    shelljs_1.default.exec("git checkout " + branchName);
    shelljs_1.default.exec("git pull origin " + branchName);
}
exports.pullRemoteBranch = pullRemoteBranch;
/**
 * 重置提交内容
 */
function reset() {
    shelljs_1.default.exec('git reset --hard HEAD^');
}
exports.reset = reset;
