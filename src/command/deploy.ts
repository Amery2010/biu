import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from '../helper/chalk'
import dayjs from 'dayjs'
import { handleError } from '../helper'
import { getCurentBranchName, getRemotes } from '../helper/git'

type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production'

/**
 * get tag date format
 * @param tpl tag date format template
 * @returns tag date format
 */
function getDateString(tpl?: string): string {
  return dayjs().format(tpl)
}

/**
 * get tag string
 * @param env deployment environment, limited to `dev`, `rc` and `prod`
 * @param dateTpl tag date format template
 * @param version project version
 * @returns tag string
 */
function getTagString(env: 'dev' | 'rc' | 'prod', dateTpl?: string, version?: string): string {
  return `deploys/${env}/${version ? `v${version}_` : ''}${getDateString(dateTpl)}`
}

/**
 * initialize the project upstream
 * @param url project upstream url
 */
function init(url: string): void {
  const remotes = getRemotes()
  if (remotes.includes('upstream')) {
    shelljs.echo(chalk.warning('Biu: the upstream remote already exists'))
  } else {
    shelljs.echo('Biu: start to initialize the project upstream...')
    shelljs.exec(`git remote add upstream ${url}`)
    shelljs.echo(chalk.success('Biu: the upstream remote is added successfully'))
  }
}

function syncBranch(branchName: string): void {
  if (!getRemotes().includes('upstream')) {
    handleError('cannot find `upstream` remote, please set up `upstream` remote first.\n biu dp --init <url>')
  }
  shelljs.echo(`Biu: pull upstream ${branchName} branch...`)
  if (getCurentBranchName() !== branchName) {
    shelljs.exec(`git fetch upstream ${branchName}`)
    shelljs.exec(`git checkout -b ${branchName} upstream/${branchName}`)
    shelljs.exec(`git pull upstream ${branchName}`)
  } else {
    shelljs.exec(`git pull upstream ${branchName}`)
  }
}

function pushTagToUpstream(tagName: string) {
  shelljs.echo('Biu: push tag to upstream...')
  shelljs.exec(`git tag ${tagName}`)
  shelljs.exec(`git push upstream ${tagName}`)
  shelljs.echo(chalk.success(`Biu: ${tagName} was pushed success`))
}

/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 * @param version project version
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
      const confirm = await prompt([
        {
          type: 'confirm',
          name: 'deployConfirm',
          message: 'Are you sure to deploy to the production environment?',
          default: false,
        },
      ])
      if (confirm.deployConfirm) {
        syncBranch('master')
        pushTagToUpstream(getTagString('prod', dateTpl, version))
      } else {
        shelljs.echo(chalk.warning('Biu: you canceled the command to deploy to the production environment'))
      }
      break
    default:
      if (env) {
        handleError(`unknown env '${env}'`)
      } else {
        const confirm = await prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Please select the environment you want to deploy.',
            choices: ['develop', 'release', 'production', 'exit'],
            default: 'develop',
          },
        ])
        if (confirm.type === 'exit') {
          shelljs.echo(chalk.warning('Biu: you canceled the deployment command'))
          shelljs.exit(1)
        } else {
          deploy(confirm.type, dateTpl, version)
        }
      }
      break
  }
}

export default {
  init,
  run: deploy,
}
