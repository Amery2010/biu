declare type GitFlowMode = 'init' | 'start' | 'finish';
/**
 * 初始化仓库，创建 develop 分支
 * @param upstream 远端仓库名称
 */
export declare function init(upstream: string): void;
declare type Prefix = {
    [name: string]: string;
};
/**
 * 开始 gitflow 工作流
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export declare function start(upstream: string, prefix: Prefix, type?: string, name?: string): Promise<void>;
/**
 * 完成 gitflow 工作流
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export declare function finish(upstream: string, prefix: Prefix, type?: string, name?: string): Promise<void>;
/**
 * 选择 gitflow 工作流
 * @param mode gitflow 类型
 * @param upstream 远端仓库名称
 * @param prefix 分支前缀
 */
export declare function gitflow(mode: GitFlowMode, upstream: string, prefix: Prefix): Promise<void>;
export {};
