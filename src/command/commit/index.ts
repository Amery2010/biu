import commander from 'commander'
import { checkGit } from '../../helper/git'
import commit from './main'

import '../../config'

import { COMMIT_TYPES } from './constant'

export default function (program: commander.Command, config: biu.Config): void {
  console.log(config)

  program
    .command('commit [message]')
    .alias('cm')
    .usage('commit|cm <message> [options]')
    .description('git 提交指令')
    .option(`-${COMMIT_TYPES.feat.alias}, --${COMMIT_TYPES.feat.name} [scope]`, COMMIT_TYPES.feat.description)
    .option(`-${COMMIT_TYPES.fix.alias}, --${COMMIT_TYPES.fix.name} [scope]`, COMMIT_TYPES.fix.description)
    .option(`-${COMMIT_TYPES.style.alias}, --${COMMIT_TYPES.style.name} [scope]`, COMMIT_TYPES.style.description)
    .option(
      `-${COMMIT_TYPES.refactor.alias}, --${COMMIT_TYPES.refactor.name} [scope]`,
      COMMIT_TYPES.refactor.description
    )
    .option(`-${COMMIT_TYPES.perf.alias}, --${COMMIT_TYPES.perf.name} [scope]`, COMMIT_TYPES.perf.description)
    .option(`-${COMMIT_TYPES.test.alias}, --${COMMIT_TYPES.test.name} [scope]`, COMMIT_TYPES.test.description)
    .option(`-${COMMIT_TYPES.docs.alias}, --${COMMIT_TYPES.docs.name} [scope]`, COMMIT_TYPES.docs.description)
    .option(`-${COMMIT_TYPES.merge.alias}, --${COMMIT_TYPES.merge.name} [scope]`, COMMIT_TYPES.merge.description)
    .option(`-${COMMIT_TYPES.revert.alias}, --${COMMIT_TYPES.revert.name} [scope]`, COMMIT_TYPES.revert.description)
    .option(`-${COMMIT_TYPES.build.alias}, --${COMMIT_TYPES.build.name} [scope]`, COMMIT_TYPES.build.description)
    .option(`-${COMMIT_TYPES.chore.alias}, --${COMMIT_TYPES.chore.name} [scope]`, COMMIT_TYPES.chore.description)
    .option(`-${COMMIT_TYPES.other.alias}, --${COMMIT_TYPES.other.name} [scope]`, COMMIT_TYPES.other.description)
    .action((message, options) => {
      checkGit()
      const commitType = Object.keys(COMMIT_TYPES).find((name) => name in options)
      if (commitType) {
        commit(message, commitType, options[commitType])
      } else {
        commit(message)
      }
    })
}
