import commander from 'commander';
declare type GitFlowMode = 'init' | 'start' | 'finish';
/**
 * 初始化仓库，创建 develop 分支
 */
export declare function init(): void;
export declare function start(type?: string, name?: string): Promise<void>;
export declare function finish(type?: string, name?: string): Promise<void>;
export declare function gitflow(mode: GitFlowMode): Promise<void>;
export default function (program: commander.Command): void;
export {};
