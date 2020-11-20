/**
 * git 提交指令
 * @param message 提交信息
 * @param type 提交类型
 * @param scope 提交范围
 */
declare function commit(message: string, type?: string, scope?: string): Promise<void>
export default commit
