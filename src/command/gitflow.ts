import shelljs from 'shelljs'
// import { prompt } from 'inquirer'
import { handleError } from '../helper'
import chalk from '../helper/chalk'
import { getLocalStatus, getLocalBranches, getRemoteBranches } from '../helper/git'

type GitFlowMode = 'init' | 'start' | 'finish'

/**
 * 检查本地是否存在未提交的
 */
function checkLocalStatus(): void {
  const localStatus = getLocalStatus()
  if (localStatus.length > 0) {
    console.log(localStatus)
    shelljs.echo(localStatus.join('\n'))
    handleError('Biu: please commit locally modified files or checkout first')
  }
}

/**
 * 初始化仓库，创建 develop 分支
 */
function init(): void {
  checkLocalStatus()
  const localBranches = getLocalBranches()
  if (!localBranches.includes('develop')) {
    const remoteBranches = getRemoteBranches()
    if (remoteBranches.includes('develop')) {
      shelljs.exec('git pull')
    } else {
      shelljs.exec('git checkout master')
      shelljs.exec('git pull')
      shelljs.exec('git checkout -b develop master')
    }
    shelljs.echo(chalk.success('Biu: the current repository initialized successfully'))
  } else {
    shelljs.echo(chalk.warning('Biu: the current repository has been initialized'))
  }
}

async function start(type?: string, name?: string): Promise<void> {
  if (type) {
    console.log(type, name)
  } else {
    // select type
  }
}

async function finish(type?: string, name?: string): Promise<void> {
  if (type) {
    console.log(type, name)
  } else {
    // select type
  }
}

async function gitflow(mode: GitFlowMode): Promise<void> {
  if (mode) {
    shelljs.echo(chalk.error(`Biu: Unknown mode '${mode}'`))
  } else {
    console.log('select mode')
  }
}

export default {
  init,
  start,
  finish,
  run: gitflow,
}
