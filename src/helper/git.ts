import shelljs from 'shelljs'

/**
 * 获取当前分支名
 * @returns 当前分支名
 */
export function getCurentBranchName(): string {
  return shelljs.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).toString().trim()
}

/**
 * 获取本地分支列表
 * @returns 本地分支列表
 */
export function getLocalBranches(): string[] {
  const raw = shelljs.exec('git branch', { silent: true }).toString().trimEnd()
  const branches: string[] = raw.split('\n')
  return branches.map((branchName) => {
    if (/\*/.test(branchName)) {
      return branchName.replace('* ', '').trim()
    } else {
      return branchName.trim()
    }
  })
}

/**
 * 获取远端分支列表
 * @returns 远端分支列表
 */
export function getRemoteBranches(): string[] {
  const raw = shelljs.exec('git branch -r', { silent: true }).toString().trimEnd()
  const branches: string[] = raw.split('\n')
  return branches.map((branchName) => {
    if (/->/.test(branchName)) {
      return branchName.split('->')[0].trim()
    } else {
      return branchName.trim()
    }
  })
}

/**
 * 获取远端仓库列表
 * @returns 远端仓库列表
 */
export function getRemotes(): string[] {
  const raw = shelljs.exec('git remote', { silent: true }).toString().trimEnd()
  const remotes: string[] = raw.split('\n')
  return remotes.map((remoteName) => remoteName.trim())
}

/**
 * 获取本地文件状态
 * @returns 本地文件状态列表
 */
export function getLocalStatus(): string[][] {
  const raw = shelljs.exec('git status --porcelain', { silent: true }).toString().trimEnd()
  const fileStatus: string[] = raw.split('\n')
  return fileStatus.map((status) => status.trim().split(' '))
}

/**
 * 重置提交内容
 */
export function reset(): void {
  shelljs.exec('git reset --hard HEAD^')
}
