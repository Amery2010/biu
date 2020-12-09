import commander from 'commander'
import { checkGit } from '../../helper/git'
import { init, deploy } from './main'
import { defaultConfig } from './config'
import lang from './i18n'

type DeployConfig = typeof defaultConfig

export default function (program: commander.Command, userConfig?: DeployConfig): void {
  const config = Object.assign({}, defaultConfig, userConfig) as DeployConfig

  program
    .command('deploy [env]')
    .alias('dp')
    .usage('deploy|dp <dev|rc|prod> [options]')
    .description(lang.command.desc)
    .option('-d, --date [tpl]', lang.command.dateTpl, config.dataTpl)
    .option('-v <version>', lang.command.version)
    .option('--init <url>', lang.command.upstreamUrl)
    .action((env, options) => {
      checkGit()
      if (options.init) {
        init(options.init, config)
      } else {
        deploy(env, options.date, options.v, config)
      }
    })
}
