declare namespace biu {
  type LangType = 'en-US' | 'zh-CN'

  interface DeployConfig {
    upstream?: string
    dataTpl?: string
  }

  interface GitFlowConfig {
    upstream?: string
    perfix?: {
      feature: string
      hotfix: string
      release: string
    }
  }

  interface Config {
    lang: LangType
    gitflow?: GitFlowConfig
    deploy?: DeployConfig
  }
}
