declare enum Lang {
    'en-US' = "English",
    'zh-CN' = "Chinese"
}
export declare type LangType = keyof typeof Lang;
export interface DeployConfig {
    upstream: string;
    dataTpl: string;
}
export interface GitFlowConfig {
    upstream: string;
    prefix: {
        feature: string;
        hotfix: string;
        release: string;
    };
}
export interface Config {
    lang: LangType;
    gitflow?: GitFlowConfig;
    deploy?: DeployConfig;
}
declare const config: Config;
export default config;
