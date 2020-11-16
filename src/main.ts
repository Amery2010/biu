#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { program } from 'commander'
import deploy from './deploy'

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

program.version(pkg.version)

program
  .command('deploy <env>')
  .alias('dp')
  .description('project deployment command')
  .option('-d, --date [tpl]', 'tag date format', 'MMDDHHmm')
  .action((env, options) => {
    deploy(env, options.date)
  })

program.parse(process.argv)
