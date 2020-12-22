import fs from 'fs'
import path from 'path'
import shelljs from 'shelljs'
import chalk from 'chalk'
import i18n from '../locals'

interface Package {
  [name: string]: unknown
  version?: string
}

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
 * 获取文件内容
 * @param path 文件所在的路径
 * @returns 文件内容
 * @throws 错误提示
 */
export function readFileData(path: string): unknown {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  } else {
    handleError(
      i18n.t('readFileError', {
        path,
      })
    )
  }
}

/**
 * 获取项目版本号
 * @returns 项目版本号
 * @throws 错误提示
 */
export function getProjectVersion(): string | void {
  const pkg = readFileData(path.resolve(process.cwd(), './package.json')) as Package
  if (pkg.version) {
    return pkg.version
  } else {
    handleError(i18n.t('getProjectVersionError'))
  }
}
