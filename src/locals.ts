import config from './config'
import I18n from './helper/i18n'

const locals = {
  'en-US': {
    needGit: 'This command depends on `git`',
    checkLocalStatusError: 'please commit locally modified files or checkout first.',
    readFileError: 'could not find {{path}} file',
    getProjectVersionError: 'version is not defined in the `package.json` file',
  },
  'zh-CN': {
    needGit: '当前指令依赖 `git`',
    checkLocalStatusError: '请先处理本地未提交的文件或切换分支。',
    readFileError: '无法获取 {{path}} 文件',
    getProjectVersionError: '在 `package.json` 文件里无法获取 version 字段',
  },
}

export default new I18n(Object.keys(locals).includes(config.lang) ? locals[config.lang] : locals['zh-CN'])
