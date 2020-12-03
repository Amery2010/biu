declare type LangType = 'en-US' | 'zh-CN';
export interface DeployConfig {
    upstream?: string;
    dataTpl?: string;
}
export interface GitFlowConfig {
    upstream?: string;
    perfix?: {
        feature: string;
        hotfix: string;
        release: string;
    };
}
export interface DefaultConfig {
    lang: LangType;
    gitflow?: GitFlowConfig;
    deploy?: DeployConfig;
}
declare const config: DefaultConfig;
export default config;
