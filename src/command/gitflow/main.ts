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
import i18n from './locals'

type GitFlowMode = 'init' | 'start' | 'finish'

/**
 * 创建分支
 * @param target 目标分支名
 * @param source 来源分支名
 */
function checkoutBranch(target: string, source: string) {
  print(
    i18n.t('checkoutBranch', {
      target,
    })
  )
  shelljs.exec(`git checkout -b ${target} ${source}`)
  print(
    i18n.t('checkoutBranchSuccess', {
      target,
    }),
    'success'
  )
}

/**
 * 合并分支
 * @param target 目标分支名
 * @param source 来源分支名
 * @throws 抛出合并错误
 */
function mergeBranch(target: string, source: string): void {
  print(
    i18n.t('mergeBranch', {
      target,
      source,
    })
  )
  if (shelljs.exec(`git merge ${source}`).stderr) {
    handleError(
      i18n.t('mergeBranchError', {
        target,
        source,
      })
    )
  }
  shelljs.exec(`git push origin ${target}`)
  print(
    i18n.t('mergeBranchSuccess', {
      target,
      source,
    }),
    'success'
  )
}

/**
 * 在完成操作后删除分支
 * @param branchName 分支名
 */
function cleanBranch(branchName: string): void {
  print(
    i18n.t('cleanBranch', {
      branchName,
    })
  )
  shelljs.exec(`git branch -d ${branchName}`)
  print(
    i18n.t('cleanBranchSuccess', {
      branchName,
    }),
    'success'
  )
}

/**
 * 推送 Tag
 * @param upstream 远端仓库名称
 * @param tagName tag 名称
 * @param message 备注信息
 */
function pushTag(upstream: string, tagName: string, message: string): void {
  print(
    i18n.t('pushTag', {
      upstream,
    })
  )
  shelljs.exec(`git tag ${tagName} -m "${message}"`)
  shelljs.exec(`git push ${upstream} ${tagName}`)
  print(
    i18n.t('pushTahSuccess', {
      tagName,
    }),
    'success'
  )
}

/**
 * 初始化仓库，创建 develop 分支
 * @param upstream 远端仓库名称
 */
export function init(upstream: string): void {
  checkLocalStatus()
  const localBranches = getLocalBranches()
  if (!localBranches.includes('develop')) {
    const remoteBranches = getRemoteBranches()
    if (remoteBranches.includes(`${upstream}/develop`)) {
      shelljs.exec(`git pull ${upstream}/develop`)
    } else {
      if (getCurentBranchName() !== 'master') {
        shelljs.exec(`git checkout ${upstream}/master`)
      }
      shelljs.exec(`git pull ${upstream}/master`)
      shelljs.exec(`git checkout -b develop ${upstream}/master`)
    }
    print(i18n.t('initRepo'), 'success')
  } else {
    print(i18n.t('initRepoWarning'), 'warning')
  }
}

type Prefix = {
  [name: string]: string
}

/**
 * 开始 gitflow 工作流
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export async function start(upstream: string, prefix: Prefix, type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    if (!name) handleError(i18n.t('missingBranchName'))
    switch (type) {
      case 'feature':
        pullRemoteBranch(`${upstream}/develop`)
        checkoutBranch(`${prefix.feature}/${name}`, `${upstream}/develop`)
        break
      case 'release':
        pullRemoteBranch(`${upstream}/develop`)
        checkoutBranch(`${prefix.release}/${name}`, `${upstream}/develop`)
        break
      case 'hotfix':
        pullRemoteBranch(`${upstream}/master`)
        checkoutBranch(`${prefix.hotfix}/${name}`, `${upstream}/master`)
        break
      default:
        handleError(
          i18n.t('unknownType', {
            type,
          })
        )
        break
    }
  } else {
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: i18n.t('selectGitflowType'),
        choices: ['feature', 'release', 'hotfix'],
      },
      {
        type: 'input',
        name: 'name',
        message: i18n.t('inputBranchName'),
      },
    ])
    start(upstream, prefix, answers.type, answers.name)
  }
}

/**
 * 完成 gitflow 工作流
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export async function finish(upstream: string, prefix: Prefix, type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    if (!name) handleError(i18n.t('missingBranchName'))
    switch (type) {
      case 'feature':
        pullRemoteBranch(`${upstream}/develop`)
        mergeBranch(`${upstream}/develop`, `${prefix.feature}/${name}`)
        cleanBranch(`${prefix.feature}/${name}`)
        print(
          i18n.t('finishedWorkflow', {
            type: 'feature',
          }),
          'success'
        )
        break
      case 'release':
        pullRemoteBranch(`${upstream}/develop`)
        mergeBranch(`${upstream}/develop`, `${prefix.release}/${name}`)
        pullRemoteBranch(`${upstream}/master`)
        mergeBranch(`${upstream}/master`, `${prefix.release}/${name}`)
        pushTag(upstream, `v${name}`, `${prefix.release} ${name}`)
        cleanBranch(`${prefix.release}/${name}`)
        print(
          i18n.t('finishedWorkflow', {
            type: 'release',
          }),
          'success'
        )
        break
      case 'hotfix':
        pullRemoteBranch(`${upstream}/master`)
        mergeBranch(`${upstream}/master`, `${prefix.hotfix}/${name}`)
        pullRemoteBranch(`${upstream}/develop`)
        mergeBranch(`${upstream}/develop`, `${prefix.hotfix}/${name}`)
        pushTag(upstream, `v${getProjectVersion()}`, `${prefix.hotfix} ${name}`)
        cleanBranch(`${prefix.hotfix}/${name}`)
        print(
          i18n.t('finishedWorkflow', {
            type: 'hotfix',
          }),
          'success'
        )
        break
      default:
        handleError(
          i18n.t('unknownType', {
            type,
          })
        )
        break
    }
  } else {
    const gitflow = await prompt([
      {
        type: 'list',
        name: 'type',
        message: i18n.t('selectGitflowType'),
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
        message: i18n.t('selectFinishedBranch'),
        choices,
      },
    ])
    finish(upstream, prefix, gitflow.type, answers.name)
  }
}

/**
 * 选择 gitflow 工作流
 * @param mode gitflow 类型
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 */
export async function gitflow(mode: GitFlowMode, upstream: string, prefix: Prefix): Promise<void> {
  if (mode) {
    handleError(
      i18n.t('unknownMode', {
        mode,
      })
    )
  } else {
    const answers = await prompt([
      {
        type: 'list',
        name: 'type',
        message: i18n.t('selectGitflowMode'),
        choices: ['start', 'finish', 'init'],
      },
    ])
    switch (answers.type) {
      case 'start':
        return start(upstream, prefix)
      case 'finish':
        return finish(upstream, prefix)
      case 'init':
        return init(upstream)
      default:
        break
    }
  }
}
