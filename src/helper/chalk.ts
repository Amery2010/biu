import chalk from 'chalk'

export const success = chalk.green
export const error = chalk.red
export const warning = chalk.keyword('yellow')

export default Object.assign(chalk, {
  success,
  error,
  fail: error,
  warning,
})
