#!/usr/bin/env node
import path from 'path'
import { program } from 'commander'
import config from './config'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { readFileData } from './helper'

interface Package {
  [name: string]: unknown
  version?: string
}

const pkg = readFileData(path.resolve(__dirname, '../package.json')) as Package

program.version(pkg?.version || '0.0.0')
deploy(program, config?.deploy)
commit(program)
gitflow(program, config?.gitflow)
program.parse(process.argv)
