import fs from 'fs'
import path from 'path'
import shelljs from 'shelljs'
import chalk from './chalk'

/**
 * 处理错误信息
 * @param message 错误信息
 */
export function handleError(message: string): void {
  shelljs.echo(chalk.error(`Biu: ${message}`))
  shelljs.exit(1)
}

/**
 * 获取 pkg 信息
 * @param pkgPath package.json 所在的路径
 * @returns pkg 信息
 * @throws 错误提示
 */
export function getPkgInfor(pkgPath: string): any {
  if (fs.existsSync(pkgPath)) {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  } else {
    handleError('Could not find `package.json` file')
  }
}

/**
 * 获取项目版本号
 * @returns 项目版本号
 * @throws 错误提示
 */
export function getProjectVersion(): string | void {
  const pkg = getPkgInfor(path.resolve(process.cwd(), './package.json'))
  if (pkg.version) {
    return pkg.version
  } else {
    handleError('Version is not defined in the `package.json` file')
  }
}
