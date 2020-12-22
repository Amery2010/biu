"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var config_1 = tslib_1.__importDefault(require("./config"));
var i18n_1 = tslib_1.__importDefault(require("./helper/i18n"));
var locals = {
    'en-US': {
        needGit: 'This command depends on `git`',
        checkLocalStatusError: 'please commit locally modified files or checkout first.',
    },
    'zh-CN': {
        needGit: '当前指令依赖 `git`',
        checkLocalStatusError: '请先处理本地未提交的文件或切换分支。',
    },
};
exports.default = new i18n_1.default(Object.keys(locals).includes(config_1.default.lang) ? locals[config_1.default.lang] : locals['zh-CN']);
