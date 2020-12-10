#!/usr/bin/env node
import path from 'path'
import { program } from 'commander'
import config from './config'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { readFileData } from './helper'

const pkg = readFileData(path.resolve(__dirname, '../package.json'))

program.version(pkg.version)
deploy(program, config?.deploy)
commit(program)
gitflow(program, config?.gitflow)
program.parse(process.argv)
