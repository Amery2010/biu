# biu

Biu 是一个快速指令的脚本工具库，该工具集合了一些常用的构建指令，让你可以体验到“Biu 的一下就搞定了”的快感。

```shell
yarn global add https://gitlab.jiliguala.com/npm/biu.git
# Or
npm i -g https://gitlab.jiliguala.com/npm/biu.git
```

## 部署指令

你可以使用 `biu deploy|dp [env]` 指令进行项目部署，其中 `env` 变量可以是 `dev | rc | prod | develop | release | production` 中的一种。具体用法如下：

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

你可以使用 `biu commit [message] --[type] [scope]` 指令提交符合规范的 `git message` 信息。具体用法如下:

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