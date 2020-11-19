import fs from 'fs'
import path from 'path'
import shelljs from 'shelljs'
import chalk from './chalk'

export function handleError(message: string): void {
  shelljs.echo(chalk.error(`Biu: ${message}`))
  shelljs.exit(1)
}

export function getProjectVersion(): string | void {
  const pkgPath = path.resolve(process.cwd(), './package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    if (pkg.version) {
      return pkg.version
    } else {
      handleError('Version is not defined in the `package.json` file')
    }
  } else {
    handleError('Could not find `package.json` file')
  }
}
