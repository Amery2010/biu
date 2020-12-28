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

const typeMap: {
  feature: string
  release: string
  hotfix: string
} = {
  feature: i18n.t('feature'),
  release: i18n.t('release'),
  hotfix: i18n.t('hotfix'),
}

const findType = (desc: string) => {
  for (const [key, val] of Object.entries(typeMap)) {
    if (val === desc) {
      return key
    }
  }
  throw new Error(i18n.t('findTypeError'))
}

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
function pushTag(tagName: string, message: string): void {
  print(i18n.t('pushTag'))
  shelljs.exec(`git tag ${tagName} -m "${message}"`)
  shelljs.exec(`git push ${tagName}`)
  print(
    i18n.t('pushTahSuccess', {
      tagName,
    }),
    'success'
  )
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
      pullRemoteBranch('develop')
    } else {
      if (getCurentBranchName() !== 'master') {
        pullRemoteBranch('master')
      }
      shelljs.exec('git checkout -b develop master')
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
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export async function start(prefix: Prefix, type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    if (!name) handleError(i18n.t('missingBranchName'))
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        checkoutBranch(`${prefix.feature}/${name}`, 'develop')
        break
      case 'release':
        pullRemoteBranch('develop')
        checkoutBranch(`${prefix.release}/${name}`, 'develop')
        break
      case 'hotfix':
        pullRemoteBranch('master')
        checkoutBranch(`${prefix.hotfix}/${name}`, 'master')
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
        choices: [typeMap.feature, typeMap.release, typeMap.hotfix],
      },
      {
        type: 'input',
        name: 'name',
        message: i18n.t('inputBranchName'),
      },
    ])
    start(prefix, findType(answers.type), answers.name)
  }
}

/**
 * 完成 gitflow 工作流
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export async function finish(prefix: Prefix, type?: string, name?: string): Promise<void> {
  checkLocalStatus()
  if (type) {
    if (!name) handleError(i18n.t('missingBranchName'))
    switch (type) {
      case 'feature':
        pullRemoteBranch('develop')
        mergeBranch('develop', `${prefix.feature}/${name}`)
        cleanBranch(`${prefix.feature}/${name}`)
        print(
          i18n.t('finishedWorkflow', {
            type: 'feature',
          }),
          'success'
        )
        break
      case 'release':
        pullRemoteBranch('develop')
        mergeBranch('develop', `${prefix.release}/${name}`)
        pullRemoteBranch('master')
        mergeBranch('master', `${prefix.release}/${name}`)
        pushTag(`v${name}`, `${prefix.release} ${name}`)
        cleanBranch(`${prefix.release}/${name}`)
        print(
          i18n.t('finishedWorkflow', {
            type: 'release',
          }),
          'success'
        )
        break
      case 'hotfix':
        pullRemoteBranch('master')
        mergeBranch('master', `${prefix.hotfix}/${name}`)
        pullRemoteBranch('develop')
        mergeBranch('develop', `${prefix.hotfix}/${name}`)
        pushTag(`v${getProjectVersion()}`, `${prefix.hotfix} ${name}`)
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
        choices: [typeMap.feature, typeMap.release, typeMap.hotfix],
      },
    ])
    const localBranches = getLocalBranches()
    const choices: string[] = []
    localBranches.forEach((branch) => {
      const branchPrefix = prefix[findType(gitflow.type)]
      if (new RegExp(`^${branchPrefix}/`).test(branch)) {
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
    finish(prefix, gitflow.type, answers.name)
  }
}

/**
 * 选择 gitflow 工作流
 * @param mode gitflow 类型
 * @param prefix 分支前缀
 */
export async function gitflow(mode: GitFlowMode, prefix: Prefix): Promise<void> {
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
        choices: [i18n.t('start'), i18n.t('finish'), i18n.t('init')],
      },
    ])
    switch (answers.type) {
      case i18n.t('start'):
        return start(prefix)
      case i18n.t('finish'):
        return finish(prefix)
      case i18n.t('init'):
        return init()
      default:
        break
    }
  }
}
