import shelljs from 'shelljs'

export function getCurentBranchName(): string {
  return shelljs.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).toString().trim()
}

export function getLocalBranches(): string[] {
  const raw = shelljs.exec('git branch', { silent: true }).toString()
  const branches: string[] = raw.split('\n')
  return branches.map((branchName) => {
    if (/\*/.test(branchName)) {
      return branchName.replace('* ', '').trim()
    } else {
      return branchName.trim()
    }
  })
}

export function getRemoteBranches(): string[] {
  const raw = shelljs.exec('git branch -r', { silent: true }).toString()
  const branches: string[] = raw.split('\n')
  return branches.map((branchName) => {
    if (/->/.test(branchName)) {
      return branchName.split('->')[0].trim()
    } else {
      return branchName.trim()
    }
  })
}

export function getRemotes(): string[] {
  const raw = shelljs.exec('git remote', { silent: true }).toString()
  const remotes: string[] = raw.split('\n')
  return remotes.map((remoteName) => remoteName.trim())
}
