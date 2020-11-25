/**
 * 处理错误信息
 * @param message 错误信息
 */
export declare function handleError(message: string): void;
/**
 * 获取 pkg 信息
 * @param pkgPath package.json 所在的路径
 * @returns pkg 信息
 * @throws 错误提示
 */
export declare function getPkgInfor(pkgPath: string): any;
/**
 * 获取项目版本号
 * @returns 项目版本号
 * @throws 错误提示
 */
export declare function getProjectVersion(): string | void;
