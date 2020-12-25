import fs from 'fs'
import path from 'path'

enum Lang {
  'en-US' = 'English',
  'zh-CN' = 'Chinese',
}
export type LangType = keyof typeof Lang

export interface DeployConfig {
  upstream: string
  dataTpl: string
}

export interface GitFlowConfig {
  prefix: {
    feature: string
    hotfix: string
    release: string
  }
}

export interface Config {
  lang: LangType
  gitflow?: GitFlowConfig
  deploy?: DeployConfig
}

const defaultConfig: Config = {
  lang: 'zh-CN',
}

/**
 * 获取配置信息
 * @description 优先尝试获取项目下的 `.biurc` 这个文件里的配置内容，
 * 其次会尝试获取 `package.json` 里的 `biuConfig` 字段，
 * 最后才会使用默认配置信息
 * @returns 配置信息
 */
function getConfig(): Config {
  const configFilePath = path.resolve(process.cwd(), '.biurc')
  if (fs.existsSync(configFilePath)) {
    return Object.assign({}, defaultConfig, JSON.parse(fs.readFileSync(configFilePath, 'utf-8')))
  }
  const pkgPath = path.resolve(process.cwd(), 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    if ('biuConfig' in pkg) {
      return Object.assign({}, defaultConfig, pkg.biuConfig)
    }
  }
  return defaultConfig
}

const config = getConfig()

console.log(config)

export default config
