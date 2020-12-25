declare type GitFlowMode = 'init' | 'start' | 'finish';
/**
 * 初始化仓库，创建 develop 分支
 */
export declare function init(): void;
declare type Prefix = {
    [name: string]: string;
};
/**
 * 开始 gitflow 工作流
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export declare function start(prefix: Prefix, type?: string, name?: string): Promise<void>;
/**
 * 完成 gitflow 工作流
 * @param prefix 分支前缀
 * @param type 工作流类型
 * @param name 分支名称
 */
export declare function finish(prefix: Prefix, type?: string, name?: string): Promise<void>;
/**
 * 选择 gitflow 工作流
 * @param mode gitflow 类型
 * @param prefix 分支前缀
 */
export declare function gitflow(mode: GitFlowMode, prefix: Prefix): Promise<void>;
export {};
