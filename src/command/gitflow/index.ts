import commander from 'commander'
import { checkGit } from '../../helper/git'
import { init, start, finish, gitflow } from './main'

import '../../config'

export const defaultConfig: biu.GitFlowConfig = {
  upstream: 'origin',
  perfix: {
    feature: 'feature',
    hotfix: 'hotfix',
    release: 'release',
  },
}

export default function (program: commander.Command, config: biu.Config): void {
  const gitflowConfig = Object.assign({}, defaultConfig, config)
  console.log(gitflowConfig)

  program
    .command('gitflow [mode]')
    .alias('gf')
    .usage('gitflow|gf <init|start|finish> [options]')
    .description('创建 gitflow 工作流')
    .option('-f, --feature <name>', 'feature/ 前缀的分支名')
    .option('-r, --release <name>', 'release/ 前缀的分支名')
    .option('-x, --hotfix <name>', 'hotfix/ 前缀的分支名')
    .action((mode, options) => {
      checkGit()
      const gitFlowType = ['feature', 'release', 'hotfix'].find((type) => type in options)
      switch (mode) {
        case 'init':
          init()
          break
        case 'start':
          if (gitFlowType) {
            start(gitFlowType, options[gitFlowType])
          } else {
            start()
          }
          break
        case 'finish':
          if (gitFlowType) {
            finish(gitFlowType, options[gitFlowType])
          } else {
            finish()
          }
          break
        default:
          gitflow(mode)
          break
      }
    })
}
