"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectVersion = exports.readFileData = exports.handleError = exports.print = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
/**
 * 输出信息
 * @param message 信息内容
 * @param type 类型，主要用于信息颜色显示
 * @param prefix 消息前缀，默认为 `Biu: `
 */
function print(message, type, prefix) {
    if (prefix === void 0) { prefix = 'Biu'; }
    var biuMessage = prefix ? prefix + ": " + message : message;
    switch (type) {
        case 'success':
            shelljs_1.default.echo(chalk_1.default.green(biuMessage));
            break;
        case 'warning':
            shelljs_1.default.echo(chalk_1.default.keyword('yellow')(biuMessage));
            break;
        case 'error':
            shelljs_1.default.echo(chalk_1.default.red(biuMessage));
            break;
        default:
            shelljs_1.default.echo(biuMessage);
            break;
    }
}
exports.print = print;
/**
 * 处理错误信息
 * @param message 错误信息
 */
function handleError(message) {
    print(message, 'error');
    shelljs_1.default.exit(1);
}
exports.handleError = handleError;
/**
 * 获取文件内容
 * @param path 文件所在的路径
 * @returns 文件内容
 * @throws 错误提示
 */
function readFileData(path) {
    if (fs_1.default.existsSync(path)) {
        return JSON.parse(fs_1.default.readFileSync(path, 'utf-8'));
    }
    else {
        handleError("could not find " + path + " file");
    }
}
exports.readFileData = readFileData;
/**
 * 获取项目版本号
 * @returns 项目版本号
 * @throws 错误提示
 */
function getProjectVersion() {
    var pkg = readFileData(path_1.default.resolve(process.cwd(), './package.json'));
    if (pkg.version) {
        return pkg.version;
    }
    else {
        handleError('version is not defined in the `package.json` file');
    }
}
exports.getProjectVersion = getProjectVersion;
