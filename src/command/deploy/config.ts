import config, { DeployConfig } from '../../config'

export const defaultConfig: DeployConfig = {
  upstream: 'origin',
  dataTpl: 'MMDDHHmm',
}

export const lang = config.lang
