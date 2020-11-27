import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import { print, handleError, getProjectVersion } from '../../helper'
import {
  checkLocalStatus,
  getCurentBranchName,
  getLocalBranches,
  getRemoteBranches,
  pullRemoteBranch,
} from '../../helper/git'

type GitFlowMode = 'init' | 'start' | 'finish'

/**
 * 创建分支
 * @param target 目标分支名
 * @param source 来源分支名
 */
function checkoutBranch(target: string, source: string) {
  print(`checkout the "${target}" branch...`)
  shelljs.exec(`git checkout -b ${target} ${source}`)
  print(`create the "${target}" branch successfully`, 'success')
}

/**
 * 合并分支
 * @param target 目标分支名
 * @param source 来源分支名
 * @throws 抛出合并错误
 */
function mergeBranch(target: string, source: string): void {
  print(`merge the "${source}" branch to "${target}" branch...`)
  if (shelljs.exec(`git merge --no-ff ${source}`, { silent: true }).stderr) {
    handleError(`an error occurred while merging the "${source}" branch to "master" branch`)
  }
  shelljs.exec(`git push origin ${target}`)
  print(`merged the "${source}" branch to "${target}" branch`, 'success')
}

/**
 * 在完成操作后删除分支
 * @param branchName 分支名
 */
function deleteBranchAfterFinishd(branchName: string): void {
  print(`delete the "${branchName}" branch...`)
  shelljs.exec(`git branch -d ${branchName}`)
  print(`finished the "${branchName}" workflow successfully`, 'success')
}

/**
 * 推送 Tag
 * @param tagName tag 名称
 * @param message 备注信息
 */
function pushTag(tagName: string, message: string): void {
  print('create and push tag to origin...')
  shelljs.exec(`git tag ${tagName} -m "${message}"`)
  shelljs.exec(`git push origin ${tagName}`)
  print(`tag ${tagName} was pushed success`, 'success')
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
    print('the current repository initialized successfully', 'success')
  } else {
    print('the current repository has been initialized', 'warning')
  }
}

export async function start(type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    if (!name) handleError('invalid branch name')
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        checkoutBranch(`feature/${name}`, 'develop')
        break
      case 'release':
        pullRemoteBranch('develop')
        checkoutBranch(`release/${name}`, 'develop')
        break
      case 'hotfix':
        pullRemoteBranch('master')
        checkoutBranch(`hotfix/${name}`, 'master')
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
        choices: ['feature', 'release', 'hotfix'],
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
    if (!name) handleError('invalid branch name')
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        mergeBranch('develop', `feature/${name}`)
        deleteBranchAfterFinishd(`feature/${name}`)
        break
      case 'release':
        pullRemoteBranch('develop')
        mergeBranch('develop', `release/${name}`)
        pullRemoteBranch('master')
        mergeBranch('master', `release/${name}`)
        pushTag(`v${name}`, `release ${name}`)
        deleteBranchAfterFinishd(`release/${name}`)
        break
      case 'hotfix':
        pullRemoteBranch('master')
        mergeBranch('master', `hotfix/${name}`)
        pullRemoteBranch('develop')
        mergeBranch('develop', `hotfix/${name}`)
        pushTag(`v${getProjectVersion()}`, `hotfix ${name}`)
        deleteBranchAfterFinishd(`hotfix/${name}`)
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
        choices: ['feature', 'release', 'hotfix'],
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
        choices: ['start', 'finish', 'init'],
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
