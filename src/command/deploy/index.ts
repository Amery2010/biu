import commander from 'commander'
import { checkGit } from '../../helper/git'
import { init, deploy } from './main'
import { defaultConfig } from './config'
import i18n from './locals'

type DeployConfig = typeof defaultConfig

export default function (program: commander.Command, deployConfig?: DeployConfig): void {
  const config = Object.assign({}, defaultConfig, deployConfig) as DeployConfig

  program
    .command('deploy [env]')
    .alias('dp')
    .usage('deploy|dp <dev|rc|prod> [options]')
    .description(i18n.t('commandDesc'))
    .option('-d, --date [tpl]', i18n.t('commandDateTpl'), config.dataTpl)
    .option('-v <version>', i18n.t('commandVersion'))
    .option('--init <url>', i18n.t('commandUpstreamUrl'))
    .action((env, options) => {
      checkGit()
      if (options.init) {
        init(options.init, config)
      } else {
        deploy(env, options.date, options.v, config)
      }
    })
}
