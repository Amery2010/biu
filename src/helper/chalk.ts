import chalk from 'chalk'

export const success = chalk.green
export const error = chalk.red
export const warning = chalk.keyword('yellow')

export default {
  success,
  ok: success,
  error,
  fail: error,
  warning,
  warn: warning,
}
