import { DefaultConfig, GitFlowConfig } from '../../config';
export declare const defaultConfig: GitFlowConfig;
export default interface Config extends DefaultConfig {
    gitflow?: GitFlowConfig;
}
