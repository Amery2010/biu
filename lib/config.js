"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var Lang;
(function (Lang) {
    Lang["en-US"] = "English";
    Lang["zh-CN"] = "Chinese";
})(Lang || (Lang = {}));
var defaultConfig = {
    lang: 'zh-CN',
};
/**
 * 获取配置信息
 * @description 优先尝试获取项目下的 `.biurc` 这个文件里的配置内容，
 * 其次会尝试获取 `package.json` 里的 `biuConfig` 字段，
 * 最后才会使用默认配置信息
 * @returns 配置信息
 */
function getConfig() {
    var configFilePath = path_1.default.resolve(process.cwd(), '.biurc');
    if (fs_1.default.existsSync(configFilePath)) {
        return Object.assign({}, defaultConfig, JSON.parse(fs_1.default.readFileSync(configFilePath, 'utf-8')));
    }
    var pkgPath = path_1.default.resolve(process.cwd(), 'package.json');
    if (fs_1.default.existsSync(pkgPath)) {
        var pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, 'utf-8'));
        if ('biuConfig' in pkg) {
            return Object.assign({}, defaultConfig, pkg.biuConfig);
        }
    }
    return defaultConfig;
}
var config = getConfig();
console.log(config);
exports.default = config;
