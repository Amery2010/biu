import shelljs from 'shelljs'
import commander from 'commander'
import { prompt } from 'inquirer'
import dayjs from 'dayjs'
import { print, handleError } from '../helper'
import { checkGit, getCurentBranchName, getRemotes } from '../helper/git'

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
 * @param url 仓库地址
 */
function init(url: string): void {
  const remotes = getRemotes()
  if (remotes.includes('upstream')) {
    print('the upstream remote already exists', 'warning')
  } else {
    print('start to initialize the project upstream...')
    shelljs.exec(`git remote add upstream ${url}`)
    print('the upstream remote is added successfully', 'success')
  }
}

/**
 * 同步分支
 * @param branchName 分支名
 */
function syncBranch(branchName: string): void {
  if (!getRemotes().includes('upstream')) {
    handleError('cannot find `upstream` remote, please set up `upstream` remote first.\n biu dp --init <url>')
  }
  print(`pull upstream ${branchName} branch...`)
  if (getCurentBranchName() !== branchName) {
    shelljs.exec(`git fetch upstream ${branchName}`)
    shelljs.exec(`git checkout -b ${branchName} upstream/${branchName}`)
    shelljs.exec(`git pull upstream ${branchName}`)
  } else {
    shelljs.exec(`git pull upstream ${branchName}`)
  }
}

/**
 * 将 Tag 推送到 `upstream` 仓库
 * @param tagName 标签名
 */
function pushTagToUpstream(tagName: string): void {
  print('push tag to upstream...')
  shelljs.exec(`git tag ${tagName}`)
  shelljs.exec(`git push upstream ${tagName}`)
  print(`${tagName} was pushed success`, 'success')
}

/**
 * 部署项目指令
 * @param env 部署环境，仅限于  `develop`、`release` 和 `production`，以及别名 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 */
async function deploy(env: EnvType, dateTpl?: string, version?: string): Promise<void> {
  switch (env) {
    case 'dev':
    case 'develop':
      pushTagToUpstream(getTagString('dev', dateTpl, version))
      break
    case 'rc':
    case 'release':
      syncBranch('develop')
      pushTagToUpstream(getTagString('rc', dateTpl, version))
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
        syncBranch('master')
        pushTagToUpstream(getTagString('prod', dateTpl, version))
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
        deploy(answers.type, dateTpl, version)
      }
      break
  }
}

export default function (program: commander.Command): void {
  program
    .command('deploy [env]')
    .alias('dp')
    .usage('deploy|dp <dev|rc|prod> [options]')
    .description('项目部署指令')
    .option('-d, --date [tpl]', '日期格式', 'MMDDHHmm')
    .option('-v <version>', '项目版本号')
    .option('--init <url>', 'upstream 仓库地址')
    .action((env, options) => {
      checkGit()
      if (options.init) {
        init(options.init)
      } else {
        deploy(env, options.date, options.v)
      }
    })
}
