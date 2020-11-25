import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import { handleError, getProjectVersion } from '../helper'
import chalk from '../helper/chalk'
import {
  checkLocalStatus,
  getCurentBranchName,
  getLocalBranches,
  getRemoteBranches,
  pullRemoteBranch,
} from '../helper/git'

type GitFlowMode = 'init' | 'start' | 'finish'

/**
 * 创建分支
 * @param target 目标分支名
 * @param source 来源分支名
 */
function checkoutBranch(target: string, source: string) {
  shelljs.exec(`git checkout -b ${target} ${source}`)
  shelljs.echo(chalk.success(`Biu: create the "${target}" branch successfully`))
}

/**
 * 合并分支
 * @param target 目标分支名
 * @param source 来源分支名
 * @throws 抛出合并错误
 */
function mergeBranch(target: string, source: string): void {
  if (shelljs.exec(`git merge --no-ff ${source}`, { silent: true }).stderr) {
    handleError(`an error occurred while merging the "${source}" branch to "master" branch`)
  }
  shelljs.exec(`git push origin ${target}`)
  shelljs.echo(chalk.success(`Biu: merged the "${source}" branch to "${target}" branch`))
}

/**
 * 在完成操作后删除分支
 * @param branchName 分支名
 */
function deleteBranchAfterFinishd(branchName: string): void {
  shelljs.exec(`git branch -d ${branchName}`)
  shelljs.echo(chalk.success(`Biu: finished the "${branchName}" workflow successfully`))
}

/**
 * 推送 Tag
 * @param tagName tag 名称
 * @param message 备注信息
 */
function pushTag(tagName: string, message: string): void {
  shelljs.exec(`git tag ${tagName} -m "${message}"`)
  shelljs.exec(`git push origin ${tagName}`)
  shelljs.echo(chalk.success(`Biu: tag ${tagName} was pushed success`))
}

/**
 * 初始化仓库，创建 develop 分支
 */
export function init(): void {
  checkLocalStatus()
  const localBranches = getLocalBranches()
  if (!localBranches.includes('develop')) {
    const remoteBranches = getRemoteBranches()
    if (remoteBranches.includes('develop')) {
      shelljs.exec('git pull')
    } else {
      if (getCurentBranchName() !== 'master') {
        shelljs.exec('git checkout master')
      }
      shelljs.exec('git pull')
      shelljs.exec('git checkout -b develop master')
    }
    shelljs.echo(chalk.success('Biu: the current repository initialized successfully'))
  } else {
    shelljs.echo(chalk.warning('Biu: the current repository has been initialized'))
  }
}

export async function start(type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        checkoutBranch(`feature/${name}`, 'develop')
        break
      case 'hotfix':
        pullRemoteBranch('master')
        checkoutBranch(`hotfix/${name}`, 'master')
        break
      case 'release':
        pullRemoteBranch('develop')
        checkoutBranch(`release/${name}`, 'develop')
        break
      default:
        handleError(`unknown type "${type}"`)
        break
    }
  } else {
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please choose a gitflow type.',
        choices: ['feature', 'hotfix', 'release'],
      },
      {
        type: 'input',
        name: 'name',
        message: `Please enter the branch name.`,
      },
    ])
    start(answers.type, answers.name)
  }
}

export async function finish(type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        mergeBranch('develop', `feature/${name}`)
        deleteBranchAfterFinishd(`feature/${name}`)
        break
      case 'hotfix':
        pullRemoteBranch('master')
        mergeBranch('master', `hotfix/${name}`)
        pullRemoteBranch('develop')
        mergeBranch('develop', `hotfix/${name}`)
        pushTag(`v${getProjectVersion()}`, `hotfix ${name}`)
        deleteBranchAfterFinishd(`hotfix/${name}`)
        break
      case 'release':
        pullRemoteBranch('master')
        mergeBranch('master', `release/${name}`)
        pullRemoteBranch('develop')
        mergeBranch('develop', `release/${name}`)
        pushTag(`v${name}`, `release ${name}`)
        deleteBranchAfterFinishd(`release/${name}`)
        break
      default:
        handleError(`unknown type "${type}"`)
        break
    }
  } else {
    const gitflow = await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please choose the gitflow type.',
        choices: ['feature', 'hotfix', 'release'],
      },
    ])
    const localBranches = getLocalBranches()
    const choices: string[] = []
    localBranches.forEach((branch) => {
      if (new RegExp(`^${gitflow.type}/`).test(branch)) {
        choices.push(branch.substring(gitflow.type.length + 1))
      }
    })
    const answers = await prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Please choose the completed branch.',
        choices,
      },
    ])
    finish(gitflow.type, answers.name)
  }
}

export async function gitflow(mode: GitFlowMode): Promise<void> {
  if (mode) {
    handleError(`unknown mode "${mode}"`)
  } else {
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please choose a gitflow mode.',
        choices: ['init', 'start', 'finish'],
      },
    ])
    switch (answers.type) {
      case 'start':
        return start()
      case 'finish':
        return finish()
      case 'init':
        return init()
      default:
        break
    }
  }
}

export default {
  init,
  start,
  finish,
  run: gitflow,
}
