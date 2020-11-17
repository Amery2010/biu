import shelljs from 'shelljs'
import { prompt } from 'inquirer'
import chalk from './helper/chalk'
import dayjs from 'dayjs'

type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production'

/**
 * get tag date format
 * @param tpl tag date format template
 * @returns tag date format
 */
function getDateString(tpl?: string): string {
  return dayjs().format(tpl)
}

function getTagString(env: 'dev' | 'rc' | 'prod', dateTpl?: string, version?: string): string {
  return `deploys/${env}/${version ? `v${version}_` : ''}${getDateString(dateTpl)}`
}

function init(url: string): void {
  shelljs.echo('Biu: start to initialize the project branch...')
  shelljs.exec(`git remote add upstream ${url}`)
  shelljs.echo(chalk.success('Biu: the upstream remote is added successfully'))
}

/**
 * deployment project
 * @param env deployment environment, limited to `develop`, `release` and `production`, alias `dev`, `rc` and `prod`.
 * @param dateTpl tag date format template
 */
async function deploy(env: EnvType, dateTpl?: string, version?: string): Promise<void> {
  let tagName = ''
  switch (env) {
    case 'dev':
    case 'develop':
      tagName = getTagString('dev', dateTpl, version)
      shelljs.echo('Biu: push tag to upstream...')
      shelljs.exec(`git tag ${tagName} -m 'build: Deploy to development environment'`)
      shelljs.exec(`git push upstream ${tagName}`)
      shelljs.echo(chalk.success(`Biu: ${tagName} was pushed success`))
      break
    case 'rc':
    case 'release':
      tagName = getTagString('rc', dateTpl, version)
      shelljs.echo('Biu: pull upstream master branch...')
      shelljs.exec('git fetch upstream develop')
      shelljs.exec('git checkout -b develop upstream/develop')
      shelljs.exec('git pull upstream develop')
      shelljs.echo('Biu: push tag to upstream...')
      shelljs.exec(`git tag ${tagName} -m 'build: Deploy to release environment'`)
      shelljs.exec(`git push upstream ${tagName}`)
      shelljs.echo(chalk.success(`Biu: ${tagName} was pushed success`))
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
        tagName = getTagString('prod', dateTpl, version)
        shelljs.echo('Biu: pull upstream master branch...')
        shelljs.exec('git fetch upstream master')
        shelljs.exec('git checkout -b master upstream/master')
        shelljs.exec('git pull upstream master')
        shelljs.echo('Biu: push tag to upstream...')
        shelljs.exec(`git tag ${tagName} -m 'build: Deploy to production environment'`)
        shelljs.exec(`git push upstream ${tagName}`)
        shelljs.echo(chalk.success(`Biu: ${tagName} was pushed success`))
      } else {
        shelljs.echo(chalk.warning('Biu: You canceled the command to deploy to the production environment'))
      }
      break
    default:
      shelljs.echo(chalk.error(`Unknown env: ${env}`))
      break
  }
}

export default {
  init,
  run: deploy,
}
