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
        shelljs.exec(`git checkout -b feature/${name} develop`)
        shelljs.echo(chalk.success(`Biu: create the "feature/${name}" branch successfully`))
        break
      case 'hotfix':
        pullRemoteBranch('master')
        shelljs.exec(`git checkout -b hotfix/${name} master`)
        shelljs.echo(chalk.success(`Biu: create the "hotfix/${name}" branch successfully`))
        break
      case 'release':
        pullRemoteBranch('develop')
        shelljs.exec(`git checkout -b release/${name} develop`)
        shelljs.echo(chalk.success(`Biu: create the "release/${name}" branch successfully`))
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
        if (shelljs.exec(`git merge --no-ff feature/${name}`).stderr) {
          handleError(`an error occurred while merging the "feature/${name}" branch to "develop" branch`)
        }
        shelljs.exec('git push origin develop')
        shelljs.exec(`git branch -d feature/${name}`)
        shelljs.echo(chalk.success(`Biu: finished the "feature/${name}" workflow successfully`))
        break
      case 'hotfix':
        pullRemoteBranch('master')
        if (shelljs.exec(`git merge --no-ff hotfix/${name}`).stderr) {
          handleError(`an error occurred while merging the "hotfix/${name}" branch to "master" branch`)
        }
        shelljs.exec('git push origin master')
        shelljs.echo(chalk.success(`Biu: merged the "hotfix/${name}" branch to "master" branch`))
        pullRemoteBranch('develop')
        if (shelljs.exec(`git merge --no-ff hotfix/${name}`).stderr) {
          handleError(`an error occurred while merging the "hotfix/${name}" branch to "develop" branch`)
        }
        shelljs.exec('git push origin develop')
        shelljs.echo(chalk.success(`Biu: merged the "hotfix/${name}" branch to "develop" branch`))
        const tagName = `v${getProjectVersion()}`
        shelljs.exec(`git tag ${tagName} -m "hotfix ${name}"`)
        shelljs.exec(`git push origin ${tagName}`)
        shelljs.echo(chalk.success(`Biu: tag ${tagName} was pushed success`))
        shelljs.exec(`git branch -d hotfix/${name}`)
        shelljs.echo(chalk.success(`Biu: finished the "hotfix/${name}" workflow successfully`))
        break
      case 'release':
        pullRemoteBranch('master')
        if (shelljs.exec(`git merge --no-ff release/${name}`).stderr) {
          handleError(`an error occurred while merging the "release/${name}" branch to "master" branch`)
        }
        shelljs.exec('git push origin master')
        shelljs.echo(chalk.success(`Biu: merged the "release/${name}" branch to "master" branch`))
        pullRemoteBranch('develop')
        if (shelljs.exec(`git merge --no-ff release/${name}`).stderr) {
          handleError(`an error occurred while merging the "release/${name}" branch to "develop" branch`)
        }
        shelljs.exec('git push origin develop')
        shelljs.echo(chalk.success(`Biu: merged the "release/${name}" branch to "develop" branch`))
        shelljs.exec(`git tag v${name} -m "release v${name}"`)
        shelljs.exec(`git push origin v${name}`)
        shelljs.echo(chalk.success(`Biu: tag v${name} was pushed success`))
        shelljs.exec(`git branch -d release/${name}`)
        shelljs.echo(chalk.success(`Biu: finished the "release/${name}" workflow successfully`))
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
    handleError(`unknown mode ${mode}`)
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
      case 'init':
        return init()
      case 'start':
        return start()
      case 'finish':
        return finish()
    }
  }
}

export default {
  init,
  start,
  finish,
  run: gitflow,
}
