#!/usr/bin/env node
import path from 'path'
import { program } from 'commander'
import deploy from './command/deploy'
import commit from './command/commit'
import gitflow from './command/gitflow'

import { getPkgInfor } from './helper'

const pkg = getPkgInfor(path.resolve(__dirname, '../package.json'))

program.version(pkg.version)
deploy(program)
commit(program)
gitflow(program)
program.parse(process.argv)
