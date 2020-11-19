"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemotes = exports.getRemoteBranches = exports.getLocalBranches = exports.getCurentBranchName = void 0;
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
function getCurentBranchName() {
    return shelljs_1.default.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).toString().trim();
}
exports.getCurentBranchName = getCurentBranchName;
function getLocalBranches() {
    var raw = shelljs_1.default.exec('git branch', { silent: true }).toString();
    var branches = raw.split('\n');
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
function getRemoteBranches() {
    var raw = shelljs_1.default.exec('git branch -r', { silent: true }).toString();
    var branches = raw.split('\n');
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
function getRemotes() {
    var raw = shelljs_1.default.exec('git remote', { silent: true }).toString();
    var remotes = raw.split('\n');
    return remotes.map(function (remoteName) { return remoteName.trim(); });
}
exports.getRemotes = getRemotes;
