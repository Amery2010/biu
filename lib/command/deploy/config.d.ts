import { DefaultConfig, DeployConfig } from '../../config';
export declare const defaultConfig: DeployConfig;
export default interface Config extends DefaultConfig {
    deploy?: DeployConfig;
}
