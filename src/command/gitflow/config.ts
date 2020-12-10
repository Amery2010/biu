import config, { GitFlowConfig } from '../../config'

export const defaultConfig: GitFlowConfig = {
  upstream: 'origin',
  perfix: {
    feature: 'feature',
    hotfix: 'hotfix',
    release: 'release',
  },
}

export const lang = config.lang
