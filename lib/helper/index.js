"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectVersion = exports.handleError = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var shelljs_1 = tslib_1.__importDefault(require("shelljs"));
var chalk_1 = tslib_1.__importDefault(require("./chalk"));
function handleError(message) {
    shelljs_1.default.echo(chalk_1.default.error("Biu: " + message));
    shelljs_1.default.exit(1);
}
exports.handleError = handleError;
function getProjectVersion() {
    var pkgPath = path_1.default.resolve(process.cwd(), './package.json');
    if (fs_1.default.existsSync(pkgPath)) {
        var pkg = JSON.parse(fs_1.default.readFileSync(pkgPath, 'utf-8'));
        if (pkg.version) {
            return pkg.version;
        }
        else {
            handleError('Version is not defined in the `package.json` file');
        }
    }
    else {
        handleError('Could not find `package.json` file');
    }
}
exports.getProjectVersion = getProjectVersion;
