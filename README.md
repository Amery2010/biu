# biu

Biu 是一个快速指令的脚本工具库，该工具集合了一些常用的构建指令，让你可以体验到“Biu 的一下就搞定了”的快感。

```shell
yarn global add https://gitlab.jiliguala.com/npm/biu.git
# Or
npm i -g https://gitlab.jiliguala.com/npm/biu.git
```

### 获取指令帮助信息

你可以通过 `biu -h` 获取 biu 工具目前支持的所有脚本命令。  
你可以通过 `biu help [command]` 获取对应指令的帮助信息。

## 部署指令

你可以使用 `biu deploy|dp <env>` 指令进行项目部署，其中 `env` 变量可以是 `dev | rc | prod | develop | release | production` 中的一种。具体用法如下：

```shell
biu deploy dev
# Or
biu dp dev
```

部署指令也支持自定义 `Tag` 的时间格式，默认为 `MMDDHHmm`。具体用法如下：

```shell
biu dp dev --date YYMMDDHHmm
# Or
biu dp dev -d YYMMDDHHmm
```

注：date 的时间格式内部使用 dayjs 进行格式化，因此你可以参考 [dayjs 时间格式化文档](https://dayjs.gitee.io/docs/zh-CN/display/format)。

部署指令支持给部署 `Tag` 加上版本号，如 `deploys/prod/v3.4_11171033`。具体用法如下：

```shell
biu dp dev -v 3.4
# Or
biu dp dev -d DDHHmm -v 3.3
```

### 懒人模式

懒人模式可以满足部分连 `dev` 这类指令都不想输入的"重度懒癌患者"...

```
biu dp
```

### 初始化远端仓库

部分项目可能一开始没有设置 `upstream` 远端仓库，而该脚本部分指令会涉及远端数据同步，你可以通过 `biu dp --init <url>` 来初始化远端仓库。


## 提交指令

你可以使用 `biu commit|cm <message> [options]` 指令提交符合规范的 `git message` 信息。具体用法如下:

```shell
biu commit '新增 Commit 指令' --feat 'commit'
# Or
biu cm '修复 bug' -x
```

### 提交类型

| 提交类型 | 别名 | 描述 |
| ------ | --- | --- |
| feat   | f   | 添加新功能 |
| fix    | x   | 错误修复 |
| style  | s   | 样式修改、格式化等 |
| refactor | r | 代码重构相关 |
| perf   | p   | 性能优化相关 |
| test   | t   | 测试相关 |
| docs   | d   | 文档相关 |
| merge  | mg  | 分支合并 |
| revert | rv  | 分支还原 |
| build  | b   | 项目构建相关 |
| chore  | c   | 与构建配置相关 |
| other  | o   | 其他修改 |

### 懒人模式

懒人模式可以让你以交互模式进行信息提交，具体用法如下:

```shell
biu cm
```

## gitflow 工作流指令

你可以使用 `biu gitflow|gf <init|start|finish> [options]` 指令来创建标准的 gitflow 工作流。具体用法如下:

```shell
biu gitflow start --feature demo
# Or
biu gf start -f demo
```

### 工作流类型

| 类型 | 别名 | 描述 |
| --------- | --- | --- |
| feature   | f   | 新功能开发 |
| release   | r   | 版本开发 |
| hotfix    | x   | 错误修复 |

### gitflow 工作流

![gitflow 工作流](https://gaeacdn.jiliguala.com/devjlgl/tmp/5a8c36674fe74ed7d27987617cdcf2a0.png)

参考文档：[git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow/)

### 实现原理

1、新功能开发

开始新功能开发 `biu gf start -f demo`，等同于以下操作流程：

```shell
git checkout develop
git checkout -b feature/demo
```

完成新功能开发 `biu gf finish -f demo`，等同于以下操作流程：

```shell
git checkout develop
git merge --no-ff feature/demo
git push origin develop
git branch -d feature/demo
```

2、版本发布

创建新版本 `biu gf start -r 1.2.0`，等同于以下操作流程：

```shell
git checkout develop
git checkout -b release/1.2.0
```

完成新版本发布 `biu gf finish -r 1.2.0`，等同于以下操作流程：

```shell
git checkout develop
git merge --no-ff release/1.2.0
git push origin develop
git checkout master
git merge --no-ff release/1.2.0
git push origin master
git tag v1.2.0 -m 'release 1.2.0'
git push origin v1.2.0
git branch -d release/1.2.0
```

3、错误修复

开始新的错误修复 `biu gf start -x fix-style`，等同于以下操作流程：

```shell
git checkout master
git checkout -b hotfix/fix-style
```

完成错误修复 `biu gf finish -x demo`，等同于以下操作流程：

```shell
git checkout master
git merge --no-ff hotfix/fix-style
git push origin master
git checkout develop
git merge --no-ff hotfix/fix-style
git push origin develop
git tag fix-style -m 'hotfix fix-style'
git push origin fix-style
git branch -d hotfix/fix-style
```

### 懒人模式

懒人模式可以让你以交互模式进行 gitflow 工作流操作，具体用法如下:

```shell
biu gf
# Or
biu gf start
```