import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from '../helper/chalk'
import { handleError } from '../helper'
import { getCurentBranchName } from '../helper/git'

import { COMMIT_TYPES } from '../constant'

/**
 * generate commit message
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 * @returns formatted commit message
 */
function generateCommitMessage(message: string, type?: string, scope?: string): string {
  if (type) {
    return `${type}${typeof scope === 'string' ? `(${scope})` : ''}: ${message}`
  }
  return message
}

/**
 * git commit command
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 */
async function commit(message: string, type?: string, scope?: string): Promise<void> {
  const commitMessage = generateCommitMessage(message, type, scope)
  if (commitMessage) {
    shelljs.exec('git add .')
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
