#!/usr/bin/env node
import path from 'path'
import { program } from 'commander'
import config from './config'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { getPkgInfor } from './helper'

const pkg = getPkgInfor(path.resolve(__dirname, '../package.json'))

program.version(pkg.version)
deploy(program, config)
commit(program, config)
gitflow(program, config)
program.parse(process.argv)
