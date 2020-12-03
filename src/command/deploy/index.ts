import commander from 'commander'
import { checkGit } from '../../helper/git'
import { init, deploy } from './main'
import Config, { defaultConfig } from './config'

export default function (program: commander.Command, config: Config): void {
  const deployConfig = Object.assign({}, defaultConfig, config)
  console.log(deployConfig)

  program
    .command('deploy [env]')
    .alias('dp')
    .usage('deploy|dp <dev|rc|prod> [options]')
    .description('项目部署指令')
    .option('-d, --date [tpl]', '日期格式', 'MMDDHHmm')
    .option('-v <version>', '项目版本号')
    .option('--init <url>', 'upstream 仓库地址')
    .action((env, options) => {
      checkGit()
      if (options.init) {
        init(options.init)
      } else {
        deploy(env, options.date, options.v)
      }
    })
}
