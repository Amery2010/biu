import { lang } from './config'
import I18n from '../../helper/i18n'

const locals = {
  'en-US': {
    commandDesc: 'project deployment command',
    commandDateTpl: 'date format',
    commandVersion: 'project version',
    commandUpstreamUrl: 'upstream url',
    initRemoteExists: 'the {{upstream}} remote already exists',
    initStart: 'start to initialize the project upstream...',
    initSuccess: 'the {{upstream}} remote is added successfully',
    syncBranchError: 'cannot find {{upstream}} remote, please set up {{upstream}} remote first.\n biu dp --init <url>',
    syncBranch: 'pull {{upstream}}/{{branchName}} branch...',
    pushTagToUpstream: 'push tag to {{upstream}}...',
    pushTagToUpstreamSuccess: '{{tagName}} was pushed success',
    deployToProdConfirm: 'Are you sure to deploy to the production environment?',
    cancelDeployToProd: 'you canceled the command to deploy to the production environment',
    unknownEnvTip: 'unknown env `{{env}}`',
    selectEnvTip: 'Please select the environment you want to deploy.',
  },
  'zh-CN': {
    commandDesc: '项目部署指令',
    commandDateTpl: '日期格式',
    commandVersion: '项目版本号',
    commandUpstreamUrl: '仓库地址',
    initRemoteExists: '{{upstream}} 远端仓库地址已经存在',
    initStart: '准备初始化远端仓库...',
    initSuccess: '{{upstream}} 仓库添加成功',
    syncBranchError: '无法获取 {{upstream}} 仓库，请先添加 {{upstream}} 仓库\n biu dp --init <url>',
    syncBranch: '拉取 {{upstream}}/{{branchName}} 分支...',
    pushTagToUpstream: '将标签推送到 {{upstream}}...',
    pushTagToUpstreamSuccess: '{{tagName}} 推送成功',
    deployToProdConfirm: '是否确认部署到生产环境？',
    cancelDeployToProd: '您取消了部署到生产环境的指令',
    unknownEnvTip: '未知的环境变量 `{{env}}`',
    selectEnvTip: '请选择您想要部署的环境。',
  },
}

export default new I18n(Object.keys(locals).includes(lang) ? locals[lang] : locals['zh-CN'])
