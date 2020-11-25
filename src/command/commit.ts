import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { print, handleError } from '../helper'
import { getCurentBranchName, getLocalStatus } from '../helper/git'

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

export default commit
