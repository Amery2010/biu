"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = exports.error = exports.success = void 0;
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.success = chalk_1.default.green;
exports.error = chalk_1.default.red;
exports.warning = chalk_1.default.keyword('yellow');
exports.default = {
    success: exports.success,
    ok: exports.success,
    error: exports.error,
    fail: exports.error,
    warning: exports.warning,
    warn: exports.warning,
};
