declare type EnvType = 'dev' | 'rc' | 'prod' | 'develop' | 'release' | 'production';
/**
 * 初始化项目的 `upstream` 仓库
 * @param upstream 远端仓库
 * @param url 仓库地址
 */
export declare function init(upstream: string, url: string): void;
/**
 * 部署项目指令
 * @param upstream 远端仓库
 * @param env 部署环境，仅限于  `develop`、`release` 和 `production`，以及别名 `dev`、`rc` 和 `prod`
 * @param dateTpl 日期格式模板
 * @param version 项目版本号
 */
export declare function deploy(upstream: string, env: EnvType, dateTpl: string, version: string): Promise<void>;
export {};
