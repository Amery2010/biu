# biu

Biu 是一个快速指令的脚本工具库，该工具集合了一些常用的构建指令，让你可以体验到“Biu 的一下就搞定了”的快感。

```shell
yarn global add @meemo/biu
# Or
npm i -g @meemo/biu
```

### 获取指令帮助信息

你可以通过 `biu -h` 获取 biu 工具目前支持的所有脚本命令。  
你可以通过 `biu help [command]` 获取对应指令的帮助信息。

## 提交指令

你可以使用 `biu commit|cm <message> [options]` 指令提交符合规范的 `git message` 信息。具体用法如下:

```shell
biu commit '新增 Commit 指令' --feat 'commit'
# Or
biu cm '修复 bug' -x
```

**注意：该指令不会将你的代码同步推送到远端仓库，本地修改内容的推送需要手动操作。**

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
git merge feature/demo
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
git merge release/1.2.0
git push origin develop
git checkout master
git merge release/1.2.0
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
git merge hotfix/fix-style
git push origin master
git checkout develop
git merge hotfix/fix-style
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