import commander from 'commander'
import { checkGit } from '../../helper/git'
import { init, start, finish, gitflow } from './main'
import { defaultConfig } from './config'
import i18n from './locals'

type GitflowConfig = typeof defaultConfig

export default function (program: commander.Command, gitflowConfig?: GitflowConfig): void {
  const config = Object.assign({}, defaultConfig, gitflowConfig) as GitflowConfig

  program
    .command('gitflow [mode]')
    .alias('gf')
    .usage('gitflow|gf <init|start|finish> [options]')
    .description(i18n.t('commandDesc'))
    .option(
      '-f, --feature <name>',
      i18n.t('subCommandDesc', {
        prefix: config.prefix.feature,
      })
    )
    .option(
      '-r, --release <name>',
      i18n.t('subCommandDesc', {
        prefix: config.prefix.release,
      })
    )
    .option(
      '-x, --hotfix <name>',
      i18n.t('subCommandDesc', {
        prefix: config.prefix.hotfix,
      })
    )
    .action((mode, options) => {
      checkGit()
      const gitFlowType = ['feature', 'release', 'hotfix'].find((type) => type in options)
      switch (mode) {
        case 'init':
          init()
          break
        case 'start':
          if (gitFlowType) {
            start(config.prefix, gitFlowType, options[gitFlowType])
          } else {
            start(config.prefix)
          }
          break
        case 'finish':
          if (gitFlowType) {
            finish(config.prefix, gitFlowType, options[gitFlowType])
          } else {
            finish(config.prefix)
          }
          break
        default:
          gitflow(mode, config.prefix)
          break
      }
    })
}
