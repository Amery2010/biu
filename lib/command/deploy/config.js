"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lang = exports.defaultConfig = void 0;
var tslib_1 = require("tslib");
var config_1 = tslib_1.__importDefault(require("../../config"));
exports.defaultConfig = {
    upstream: 'origin',
    dataTpl: 'MMDDHHmm',
};
exports.lang = config_1.default.lang;
