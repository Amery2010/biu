import config from './config'
import I18n from './helper/i18n'

const locals = {
  'en-US': {
    needGit: 'This command depends on `git`',
    checkLocalStatusError: 'please commit locally modified files or checkout first.',
  },
  'zh-CN': {
    needGit: '当前指令依赖 `git`',
    checkLocalStatusError: '请先处理本地未提交的文件或切换分支。',
  },
}

export default new I18n(Object.keys(locals).includes(config.lang) ? locals[config.lang] : locals['zh-CN'])
