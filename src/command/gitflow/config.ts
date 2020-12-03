import { DefaultConfig, GitFlowConfig } from '../../config'

export const defaultConfig: GitFlowConfig = {
  upstream: 'origin',
  perfix: {
    feature: 'feature',
    hotfix: 'hotfix',
    release: 'release',
  },
}

export default interface Config extends DefaultConfig {
  gitflow?: GitFlowConfig
}
