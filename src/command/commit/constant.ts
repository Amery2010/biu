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
  WIP: {
    name: 'WIP',
    alias: 'wip',
    description: i18n.t('wipDesc'),
  },
  feat: {
    name: 'feat',
    alias: 'f',
    description: i18n.t('featDesc'),
  },
  fix: {
    name: 'fix',
    alias: 'x',
    description: i18n.t('fixDesc'),
  },
  style: {
    name: 'style',
    alias: 's',
    description: i18n.t('styleDesc'),
  },
  refactor: {
    name: 'refactor',
    alias: 'r',
    description: i18n.t('refactorDesc'),
  },
  perf: {
    name: 'perf',
    alias: 'p',
    description: i18n.t('perfDesc'),
  },
  test: {
    name: 'test',
    alias: 't',
    description: i18n.t('testDesc'),
  },
  docs: {
    name: 'docs',
    alias: 'd',
    description: i18n.t('docsDesc'),
  },
  merge: {
    name: 'merge',
    alias: 'mg',
    description: i18n.t('mergeDesc'),
  },
  revert: {
    name: 'revert',
    alias: 'rv',
    description: i18n.t('revertDesc'),
  },
  build: {
    name: 'build',
    alias: 'b',
    description: i18n.t('buildDesc'),
  },
  chore: {
    name: 'chore',
    alias: 'c',
    description: i18n.t('choreDesc'),
  },
  other: {
    name: 'other',
    alias: 'o',
    description: i18n.t('otherDesc'),
  },
}
