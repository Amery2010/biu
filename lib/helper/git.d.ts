/**
 * 检查系统是否已经安装 git
 * @throws 提示用户需要安装 git
 */
export declare function checkGit(): void;
/**
 * 获取当前分支名
 * @returns 当前分支名
 */
export declare function getCurentBranchName(): string;
/**
 * 获取本地分支列表
 * @returns 本地分支列表
 */
export declare function getLocalBranches(): string[];
/**
 * 获取远端分支列表
 * @returns 远端分支列表
 */
export declare function getRemoteBranches(): string[];
/**
 * 获取远端仓库列表
 * @returns 远端仓库列表
 */
export declare function getRemotes(): string[];
/**
 * 获取本地文件状态
 * @returns 本地文件状态列表
 */
export declare function getLocalStatus(): string[][];
/**
 * 检查本地是否存在未提交的
 */
export declare function checkLocalStatus(): void;
/**
 * 拉取远端分支内容到本地
 * @param branchName 分支名
 */
export declare function pullRemoteBranch(branchName: string): void;
/**
 * 重置提交内容
 */
export declare function reset(): void;
