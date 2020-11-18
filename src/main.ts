#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { program } from 'commander'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { COMMIT_TYPES } from './constant'

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

program.version(pkg.version)

program
  .command('deploy [env]')
  .alias('dp')
  .usage('deploy|dp [options] dev|rc|prod')
  .description('project deployment command')
  .option('-d, --date [tpl]', 'tag date format', 'MMDDHHmm')
  .option('-v <version>', 'project version')
  .option('--init <url>', 'git upstream url')
  .action((env, options) => {
    if (options.init) {
      deploy.init(options.init)
    } else {
      deploy.run(env, options.date, options.v)
    }
  })

program
  .command('commit [message]')
  .alias('cm')
  .description('git commit command')
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
  .usage('gitflow|gf [options] init|start|finish')
  .description('create a git workflow')
  .option('-f, --feature <name>', 'branch prefixed with feature')
  .option('-x, --hotfix <name>', 'branch prefixed with hotfix')
  .option('-r, --release <name>', 'branch prefixed with release')
  .action((mode, options) => {
    const gitFlowType = ['feature', 'hotfix', 'release'].find((type) => type in options)
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

program.parse(process.argv)
