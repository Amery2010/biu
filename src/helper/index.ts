import fs from 'fs'
import path from 'path'
import shelljs from 'shelljs'
import chalk from 'chalk'

/**
 * 输出信息
 * @param message 信息内容
 * @param type 类型，主要用于信息颜色显示
 * @param prefix 消息前缀，默认为 `Biu: `
 */
export function print(message: string, type?: 'success' | 'warning' | 'error', prefix = 'Biu'): void {
  const biuMessage = prefix ? `${prefix}: ${message}` : message
  switch (type) {
    case 'success':
      shelljs.echo(chalk.green(biuMessage))
      break
    case 'warning':
      shelljs.echo(chalk.keyword('yellow')(biuMessage))
      break
    case 'error':
      shelljs.echo(chalk.red(biuMessage))
      break
    default:
      shelljs.echo(biuMessage)
      break
  }
}

/**
 * 处理错误信息
 * @param message 错误信息
 */
export function handleError(message: string): void {
  print(message, 'error')
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
