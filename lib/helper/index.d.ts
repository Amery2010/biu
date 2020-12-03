/**
 * 输出信息
 * @param message 信息内容
 * @param type 类型，主要用于信息颜色显示
 * @param prefix 消息前缀，默认为 `Biu: `
 */
export declare function print(message: string, type?: 'success' | 'warning' | 'error', prefix?: string): void;
/**
 * 处理错误信息
 * @param message 错误信息
 */
export declare function handleError(message: string): void;
/**
 * 获取文件内容
 * @param path 文件所在的路径
 * @returns 文件内容
 * @throws 错误提示
 */
export declare function readFileData(path: string): any;
/**
 * 获取项目版本号
 * @returns 项目版本号
 * @throws 错误提示
 */
export declare function getProjectVersion(): string | void;
