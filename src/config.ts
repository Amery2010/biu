import fs from 'fs'
import path from 'path'

type LangType = 'en-US' | 'zh-CN'

export interface DeployConfig {
  upstream?: string
  dataTpl?: string
}

export interface GitFlowConfig {
  upstream?: string
  perfix?: {
    feature: string
    hotfix: string
    release: string
  }
}

export interface DefaultConfig {
  lang: LangType
  gitflow?: GitFlowConfig
  deploy?: DeployConfig
}

const defaultConfig: DefaultConfig = {
  lang: 'zh-CN',
}

/**
 * 获取配置信息
 * @description 优先尝试获取项目下的 `.biurc` 这个文件里的配置内容，
 * 其次会尝试获取 `package.json` 里的 `biuConfig` 字段，
 * 最后才会使用默认配置信息
 * @returns 配置信息
 */
function getConfig(): DefaultConfig {
  const configFilePath = path.resolve(__dirname, '.biurc')
  if (fs.existsSync(configFilePath)) {
    return Object.assign(defaultConfig, JSON.parse(fs.readFileSync(configFilePath, 'utf-8')))
  }
  const pkgPath = path.resolve(__dirname, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    if ('biuConfig' in pkg) {
      return Object.assign(defaultConfig, pkg.biuConfig)
    }
  }
  return defaultConfig
}

const config = getConfig()

console.log(config)

export default config
