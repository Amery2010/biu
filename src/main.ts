#!/usr/bin/env node
import path from 'path'
import { program } from 'commander'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { getPkgInfor } from './helper'
import { checkGit } from './helper/git'

import { COMMIT_TYPES } from './constant'

const pkg = getPkgInfor(path.resolve(__dirname, '../package.json'))

program.version(pkg.version)

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
      deploy.init(options.init)
    } else {
      deploy.run(env, options.date, options.v)
    }
  })

program
  .command('commit [message]')
  .alias('cm')
  .usage('commit|cm <message> [options]')
  .description('git 提交指令')
  .option(`-${COMMIT_TYPES.feat.alias}, --${COMMIT_TYPES.feat.name} [scope]`, COMMIT_TYPES.feat.description)
  .option(`-${COMMIT_TYPES.fix.alias}, --${COMMIT_TYPES.fix.name} [scope]`, COMMIT_TYPES.fix.description)
  .option(`-${COMMIT_TYPES.style.alias}, --${COMMIT_TYPES.style.name} [scope]`, COMMIT_TYPES.style.description)
  .option(`-${COMMIT_TYPES.refactor.alias}, --${COMMIT_TYPES.refactor.name} [scope]`, COMMIT_TYPES.refactor.description)
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
        gitflow.init()
        break
      case 'start':
        if (gitFlowType) {
          gitflow.start(gitFlowType, options[gitFlowType])
        } else {
          gitflow.start()
        }
        break
      case 'finish':
        if (gitFlowType) {
          gitflow.finish(gitFlowType, options[gitFlowType])
        } else {
          gitflow.finish()
        }
        break
      default:
        gitflow.run(mode)
        break
    }
  })

// program.command('test').action(() => {
//   console.log(getLocalStatus())
// })

program.parse(process.argv)
