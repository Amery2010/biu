# biu

Biu 是一个快速指令的脚本工具库，该工具集合了一些常用的构建指令，让你可以体验到“Biu 的一下就搞定了”的快感。

```shell
yarn global add https://gitlab.jiliguala.com/npm/biu.git
# Or
npm i -g https://gitlab.jiliguala.com/npm/biu.git
```

## 部署命令

你可以使用 `biu deploy|dp [env]` 命令进行项目部署，其中 `env` 变量可以是 `dev | rc | prod | develop | release | production` 中的一种。具体用法如下：

```shell
biu deploy dev
# Or
biu dp dev
```

部署命令也支持自定义 `Tag` 的时间格式，默认为 `MMDDHHmm`。具体用法如下：

```shell
biu dp dev --date YYMMDDHHmm
# Or
biu dp dev -d YYMMDDHHmm
```

部署命令支持给部署 `Tag` 加上版本号，如 `deploys/prod/v3.4_11171033`。具体用法如下：

```shell
biu dp dev -v 3.4
# Or
biu dp dev -d DDHHmm -v 3.3
```
