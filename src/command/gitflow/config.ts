import config, { GitFlowConfig } from '../../config'

export const defaultConfig: GitFlowConfig = {
  prefix: {
    feature: 'feature',
    hotfix: 'hotfix',
    release: 'release',
  },
}

export const lang = config.lang
