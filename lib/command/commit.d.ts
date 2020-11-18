/**
 * git commit command
 * @param message commit message
 * @param type commit type
 * @param scope commit scope
 */
declare function commit(message: string, type?: string, scope?: string): Promise<void>
export default commit
