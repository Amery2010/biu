"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
// import { prompt } from 'inquirer'
var chalk_1 = tslib_1.__importDefault(require("../helper/chalk"));
function init() {
    console.log('init');
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
