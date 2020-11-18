declare type GitFlowMode = 'init' | 'start' | 'finish'
declare function init(): void
declare function start(type?: string, name?: string): Promise<void>
declare function finish(type?: string, name?: string): Promise<void>
declare function gitflow(mode: GitFlowMode): Promise<void>
declare const _default: {
  init: typeof init
  start: typeof start
  finish: typeof finish
  run: typeof gitflow
}
export default _default
