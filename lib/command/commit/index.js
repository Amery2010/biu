"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var git_1 = require("../../helper/git");
var main_1 = tslib_1.__importDefault(require("./main"));
var locals_1 = tslib_1.__importDefault(require("./locals"));
var constant_1 = require("./constant");
function default_1(program) {
    program
        .command('commit [message]')
        .alias('cm')
        .usage('commit|cm <message> [options]')
        .description(locals_1.default.t('commandDesc'))
        .option("-" + constant_1.COMMIT_TYPES.WIP.alias + ", --" + constant_1.COMMIT_TYPES.WIP.name + " [scope]", constant_1.COMMIT_TYPES.WIP.description)
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
            main_1.default(message, commitType, options[commitType]);
        }
        else {
            main_1.default(message);
        }
    });
}
exports.default = default_1;
