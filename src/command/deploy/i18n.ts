import { lang } from './config'

const i18n = {
  'en-US': {
    command: {
      desc: 'project deployment command',
      dateTpl: 'date format',
      version: 'project version',
      upstreamUrl: 'upstream url',
    },
  },
  'zh-CN': {
    command: {
      desc: '项目部署指令',
      dateTpl: '日期格式',
      version: '项目版本号',
      upstreamUrl: '仓库地址',
    },
  },
}

export default i18n[lang]
