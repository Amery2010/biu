import i18n from './locals'

interface CommitType {
  name: string
  alias: string
  description: string
}

interface CommitTypes {
  [type: string]: CommitType
}

export const COMMIT_TYPES: CommitTypes = {
  feat: {
    name: 'feat',
    alias: 'f',
    description: i18n.t('featDesc'),
  },
  fix: {
    name: 'fix',
    alias: 'x',
    description: '错误修复',
  },
  style: {
    name: 'style',
    alias: 's',
    description: '样式修改、格式化等',
  },
  refactor: {
    name: 'refactor',
    alias: 'r',
    description: '代码重构相关',
  },
  perf: {
    name: 'perf',
    alias: 'p',
    description: '性能优化相关',
  },
  test: {
    name: 'test',
    alias: 't',
    description: '测试相关',
  },
  docs: {
    name: 'docs',
    alias: 'd',
    description: '文档相关',
  },
  merge: {
    name: 'merge',
    alias: 'mg',
    description: '分支合并',
  },
  revert: {
    name: 'revert',
    alias: 'rv',
    description: '分支还原',
  },
  build: {
    name: 'build',
    alias: 'b',
    description: '项目构建相关',
  },
  chore: {
    name: 'chore',
    alias: 'c',
    description: '与构建配置相关',
  },
  other: {
    name: 'other',
    alias: 'o',
    description: '其他修改',
  },
}
