import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from './helper/chalk'

import { COMMIT_TYPES } from './constant'

/**
 * generate commit message
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 * @returns formatted commit message
 */
function generateCommitMessage(message: string, type?: string, scope?: string): string {
  if (type) {
    return `${type}${scope ? `(${scope})` : ''}: ${message}`
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
    shelljs.exec(`git commit -m ${commitMessage}`)
    shelljs.echo(chalk.success('Biu: commit message success'))
  } else {
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
      commit(confirm.message, confirm.type, confirm.scope)
    } else {
      shelljs.echo(chalk.error('Biu: commit message is required!'))
    }
  }
}

export default commit
