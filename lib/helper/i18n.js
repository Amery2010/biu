"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var I18n = /** @class */ (function () {
    function I18n(locals) {
        this.locals = locals;
    }
    I18n.prototype.t = function (key, vars) {
        var text = this.locals[key];
        if (vars) {
            Object.entries(vars).forEach(function (_a) {
                var k = _a[0], v = _a[1];
                text = text.replace(new RegExp('{{' + k + '}}', 'g'), v);
            });
        }
        return text;
    };
    return I18n;
}());
exports.default = I18n;
