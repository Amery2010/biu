import shelljs from 'shelljs'
import commander from 'commander'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { print, handleError } from '../helper'
import { checkGit, getCurentBranchName, getLocalStatus } from '../helper/git'

import { COMMIT_TYPES } from '../constant'

/**
 * 生成提交信息
 * @param message 提交信息
 * @param type 提交类型
 * @param scope 提交范围
 * @returns 格式化后的提交信息
 */
function generateCommitMessage(message: string, type?: string, scope?: string): string {
  if (type) {
    return `${type}${scope ? `(${scope})` : ''}: ${message}`
  }
  return message
}

/**
 * git 提交指令
 * @param message 提交信息
 * @param type 提交类型
 * @param scope 提交范围
 */
async function commit(message: string, type?: string, scope?: string): Promise<void> {
  const commitMessage = generateCommitMessage(message, type, scope)
  if (commitMessage) {
    const localStatus = getLocalStatus()
    if (localStatus.length > 0) {
      shelljs.echo(localStatus.join('\n'))
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Do you want to commit locally modified files?',
        },
      ])
      if (answers.confirm) {
        shelljs.exec('git add .')
      } else {
        print('please commit locally modified files or checkout first', 'warning')
        shelljs.exit(1)
      }
    }
    shelljs.exec(`git commit -m '${commitMessage}'`)
    print('commit message success', 'success')
  } else {
    print(chalk.green(`current branch is `) + chalk.red(getCurentBranchName()))
    const choices: string[] = []
    Object.keys(COMMIT_TYPES).forEach((name) => {
      choices.push(name.padEnd(15, ' ') + COMMIT_TYPES[name].description)
    })
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please choose a commit type.',
        choices,
      },
      {
        type: 'input',
        name: 'scope',
        message: 'Please enter the commit scope.',
        default: '',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Please enter the commit message.',
      },
    ])
    if (answers.message) {
      const commitType = answers.type.split(' ')[0]
      commit(answers.message, commitType, answers.scope)
    } else {
      handleError('commit message is required!')
    }
  }
}

export default function (program: commander.Command): void {
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
