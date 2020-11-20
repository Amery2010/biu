import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from '../helper/chalk'
import { handleError } from '../helper'
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
    return `${type}${typeof scope === 'string' ? `(${scope})` : ''}: ${message}`
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
          message: 'Whether to commit locally modified files',
        },
      ])
      if (answers.confirm) {
        shelljs.exec('git add .')
      } else {
        shelljs.echo(chalk.warning('Biu: please process locally modified files first'))
        shelljs.exit(1)
      }
    }
    shelljs.exec(`git commit -m '${commitMessage}'`)
    shelljs.echo(chalk.success('Biu: commit message success'))
  } else {
    shelljs.echo(chalk.green(`Biu: current branch is `) + chalk.red(getCurentBranchName()))
    const choices: string[] = []
    Object.keys(COMMIT_TYPES).forEach((name) => {
      choices.push(name.padEnd(15, ' ') + COMMIT_TYPES[name].description)
    })
    const confirm = await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please select commit type.',
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
    if (confirm.message) {
      const commitType = confirm.type.split(' ')[0]
      commit(confirm.message, commitType, confirm.scope)
    } else {
      handleError('commit message is required!')
    }
  }
}

export default commit
