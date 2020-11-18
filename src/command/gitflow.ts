import shelljs from 'shelljs'
// import { prompt } from 'inquirer'
import chalk from '../helper/chalk'

type GitFlowMode = 'init' | 'start' | 'finish'

function init(): void {
  console.log('init')
}

async function start(type?: string, name?: string): Promise<void> {
  if (type) {
    console.log(type, name)
  } else {
    // select type
  }
}

async function finish(type?: string, name?: string): Promise<void> {
  if (type) {
    console.log(type, name)
  } else {
    // select type
  }
}

async function gitflow(mode: GitFlowMode): Promise<void> {
  if (mode) {
    shelljs.echo(chalk.error(`Biu: Unknown mode '${mode}'`))
  } else {
    console.log('select mode')
  }
}

export default {
  init,
  start,
  finish,
  run: gitflow,
}
