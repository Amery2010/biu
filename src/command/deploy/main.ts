import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import dayjs from 'dayjs'
import { print, handleError } from '../../helper'
import { getCurentBranchName, getRemotes } from '../../helper/git'

import { defaultConfig } from './config'

type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production'

/**
 * 获取格式化的日期
 * @param tpl 日期格式模板
 * @returns 格式化的日期
 */
function getDateString(tpl?: string): string {
  return dayjs().format(tpl)
}

/**
 * 获取 Tag 文本
 * @param env 部署环境，仅限于 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 * @returns Tag 文本
 */
function getTagString(env: 'dev' | 'rc' | 'prod', dateTpl?: string, version?: string): string {
  return `deploys/${env}/${version ? `v${version}_` : ''}${getDateString(dateTpl)}`
}

/**
 * 初始化项目的 `upstream` 仓库
 * @param upstream 远端仓库
 * @param url 仓库地址
 */
export function init(url: string, options: typeof defaultConfig): void {
  const remotes = getRemotes()
  if (remotes.includes('upstream')) {
    print(`the ${options.upstream}  remote already exists`, 'warning')
  } else {
    print('start to initialize the project upstream...')
    shelljs.exec(`git remote add ${options.upstream} ${url}`)
    print(`the ${options.upstream} remote is added successfully`, 'success')
  }
}

/**
 * 同步分支
 * @param upstream 远端仓库
 * @param branchName 分支名
 */
function syncBranch(upstream: string, branchName: string): void {
  if (!getRemotes().includes(upstream)) {
    handleError(`cannot find ${upstream} remote, please set up ${upstream} remote first.\n biu dp --init <url>`)
  }
  print(`pull ${upstream} ${branchName} branch...`)
  if (getCurentBranchName() !== branchName) {
    shelljs.exec(`git fetch ${upstream} ${branchName}`)
    shelljs.exec(`git checkout -b ${branchName} ${upstream}/${branchName}`)
    shelljs.exec(`git pull ${upstream} ${branchName}`)
  } else {
    shelljs.exec(`git pull ${upstream} ${branchName}`)
  }
}

/**
 * 将 Tag 推送到 `upstream` 仓库
 * @param upstream 远端仓库
 * @param tagName 标签名
 */
function pushTagToUpstream(upstream: string, tagName: string): void {
  print(`push tag to ${upstream}...`)
  shelljs.exec(`git tag ${tagName}`)
  shelljs.exec(`git push ${upstream} ${tagName}`)
  print(`${tagName} was pushed success`, 'success')
}

/**
 * 部署项目指令
 * @param upstream 远端仓库
 * @param env 部署环境，仅限于  `develop`、`release` 和 `production`，以及别名 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 */
export async function deploy(
  env: EnvType,
  dateTpl: string,
  version: string,
  options: typeof defaultConfig
): Promise<void> {
  switch (env) {
    case 'dev':
    case 'develop':
      pushTagToUpstream(options.upstream, getTagString('dev', dateTpl, version))
      break
    case 'rc':
    case 'release':
      syncBranch(options.upstream, 'develop')
      pushTagToUpstream(options.upstream, getTagString('rc', dateTpl, version))
      break
    case 'prod':
    case 'production':
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure to deploy to the production environment?',
          default: false,
        },
      ])
      if (answers.confirm) {
        syncBranch(options.upstream, 'master')
        pushTagToUpstream(options.upstream, getTagString('prod', dateTpl, version))
      } else {
        print('you canceled the command to deploy to the production environment', 'warning')
      }
      break
    default:
      if (env) {
        handleError(`unknown env "${env}"`)
      } else {
        const answers = await prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Please select the environment you want to deploy.',
            choices: ['develop', 'release', 'production'],
            default: 'develop',
          },
        ])
        deploy(answers.type, dateTpl, version, options)
      }
      break
  }
}
