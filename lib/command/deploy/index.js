"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var git_1 = require("../../helper/git");
var main_1 = require("./main");
require("../../config");
var defaultConfig = {
    upstream: 'upstream',
    dataTpl: 'MMDDHHmm',
};
function default_1(program, config) {
    var deployConfig = Object.assign({}, defaultConfig, config);
    console.log(deployConfig);
    program
        .command('deploy [env]')
        .alias('dp')
        .usage('deploy|dp <dev|rc|prod> [options]')
        .description('项目部署指令')
        .option('-d, --date [tpl]', '日期格式', 'MMDDHHmm')
        .option('-v <version>', '项目版本号')
        .option('--init <url>', 'upstream 仓库地址')
        .action(function (env, options) {
        git_1.checkGit();
        if (options.init) {
            main_1.init(options.init);
        }
        else {
            main_1.deploy(env, options.date, options.v);
        }
    });
}
exports.default = default_1;
