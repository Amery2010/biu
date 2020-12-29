import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import dayjs from 'dayjs'
import { print, handleError } from '../../helper'
import { getCurentBranchName, getRemotes } from '../../helper/git'
import i18n from './locals'

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
export function init(upstream: string, url: string): void {
  const remotes = getRemotes()
  if (remotes.includes(upstream)) {
    print(
      i18n.t('initRemoteExists', {
        upstream,
      }),
      'warning'
    )
  } else {
    print(i18n.t('initStart'))
    shelljs.exec(`git remote add ${upstream} ${url}`)
    print(
      i18n.t('initSuccess', {
        upstream,
      }),
      'success'
    )
  }
}

/**
 * 同步分支
 * @param upstream 远端仓库
 * @param branchName 分支名
 */
function syncBranch(upstream: string, branchName: string): void {
  if (!getRemotes().includes(upstream)) {
    handleError(
      i18n.t('syncBranchError', {
        upstream,
      })
    )
  }
  print(
    i18n.t('syncBranch', {
      upstream,
      branchName,
    })
  )
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
  print(
    i18n.t('pushTagToUpstream', {
      upstream,
    })
  )
  shelljs.exec(`git tag ${tagName}`)
  shelljs.exec(`git push ${upstream} ${tagName}`)
  print(
    i18n.t('pushTagToUpstreamSuccess', {
      tagName,
    }),
    'success'
  )
}

/**
 * 部署项目指令
 * @param upstream 远端仓库
 * @param env 部署环境，仅限于  `develop`、`release` 和 `production`，以及别名 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 */
export async function deploy(upstream: string, env: EnvType, dateTpl: string, version: string): Promise<void> {
  switch (env) {
    case 'dev':
    case 'develop':
      pushTagToUpstream(upstream, getTagString('dev', dateTpl, version))
      break
    case 'rc':
    case 'release':
      syncBranch(upstream, 'develop')
      pushTagToUpstream(upstream, getTagString('rc', dateTpl, version))
      break
    case 'prod':
    case 'production':
      const answers = await prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: i18n.t('deployToProdConfirm'),
          default: false,
        },
      ])
      if (answers.confirm) {
        syncBranch(upstream, 'master')
        pushTagToUpstream(upstream, getTagString('prod', dateTpl, version))
      } else {
        print(i18n.t('cancelDeployToProd'), 'warning')
      }
      break
    default:
      if (env) {
        handleError(
          i18n.t('unknownEnvTip', {
            env,
          })
        )
      } else {
        const answers = await prompt([
          {
            type: 'list',
            name: 'type',
            message: i18n.t('selectEnvTip'),
            choices: ['develop', 'release', 'production'],
            default: 'develop',
          },
        ])
        deploy(upstream, answers.type, dateTpl, version)
      }
      break
  }
}
