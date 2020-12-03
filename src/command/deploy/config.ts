import { DefaultConfig, DeployConfig } from '../../config'

export const defaultConfig: DeployConfig = {
  upstream: 'upstream',
  dataTpl: 'MMDDHHmm',
}

export default interface Config extends DefaultConfig {
  deploy?: DeployConfig
}
