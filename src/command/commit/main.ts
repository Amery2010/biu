import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { print, handleError } from '../../helper'
import { getCurentBranchName, getLocalStatus } from '../../helper/git'
import i18n from './locals'

import { COMMIT_TYPES } from './constant'

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
export default async function commit(message: string, type?: string, scope?: string): Promise<void> {
  const commitMessage = generateCommitMessage(message, type, scope)
  if (commitMessage) {
    const localStatus = getLocalStatus()
    if (localStatus.length > 0) {
      shelljs.echo(localStatus.join('\n'))
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: i18n.t('localStatusConfirm'),
        },
      ])
      if (answers.confirm) {
        shelljs.exec('git add .')
      } else {
        print(i18n.t('localStatusWarning'), 'warning')
        shelljs.exit(1)
      }
    }
    shelljs.exec(`git commit -m '${commitMessage}'`)
    print(i18n.t('commitSuccess'), 'success')
  } else {
    print(i18n.t('currentBranchDesc') + chalk.green(getCurentBranchName()))
    const choices: string[] = []
    Object.keys(COMMIT_TYPES).forEach((name) => {
      choices.push(COMMIT_TYPES[name].description)
    })
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: i18n.t('selectTypeMsg'),
        choices,
      },
      {
        type: 'input',
        name: 'scope',
        message: i18n.t('inputScopeMsg'),
        default: '',
      },
      {
        type: 'input',
        name: 'message',
        message: i18n.t('inputDescMsg'),
      },
    ])
    if (answers.message) {
      const findType = (desc: string) => {
        let type = ''
        Object.values(COMMIT_TYPES).forEach((props) => {
          if (props.description === desc) type = props.name
        })
        return type
      }
      const commitType = findType(answers.type)
      commit(answers.message, commitType, answers.scope)
    } else {
      handleError(i18n.t('commitError'))
    }
  }
}
