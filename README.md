# my-cli 脚手架

## 概述
    封装一个my-cli 生成通用的脚手架 webpack版本为5

## 命令
- create：创建项目，并初始化项目骨架
- init: 初始化项目骨架，根据依赖列表，逐个安装依赖，如果安装失败，则跳过该依赖并在结束时，展示安装失败的情况
- dev: 启动项目
- test: 测试项目
- build: 构建项目

## 开发思路
- my-cli识别
    - 要变成一个可执行的命令
    - npm link的方式变成软连接，便于node解析命令
- my-cli后续参数的识别
    - 当没有参数时，需要展示帮助手册
    - 当有参数时，需要对参数进行解析，
    - 用inquirer做命令参数解析，解析命令如下：
        - create \<name\>
        - init
        - dev
        - test
        - build
    - 需要根据参数，做node命令的执行，inquirer解析参数，child_process命令执行

## 需要安装的依赖
    @babel/core
    @babel/plugin-transform-runtime
    @babel/preset-env
    @vue/test-utils
    babel-core
    babel-jest
    babel-loader
    css-loader
    css-minimizer-webpack-plugin
    extract-loader
    html-webpack-plugin
    jest
    mini-css-extract-plugin
    style-loader
    vue-jest
    vue-loader
    vue-template-compiler
    webpack-cli
    webpack-dev-server
    @babel/runtime
    @types/jest
    sinon
    ts-node
    typescript
    vue
    webpack

##  webpack配置设计思路
- 会内置一个默认的webpack配置
- 然后对外读取项目的webpack.config.js的自定义配置
- 通过deepAssign聚合最终的配置  

## 项目骨架
    |-project
    |   |-dist
    |       |-css
    |       |-js
    |       |-index.html
    |   |-test
    |       |-index.test.js
    |   |-src
    |       |-index.js
    |   |-webpack.config.js

## 测试设计

## cli工具的设计框架
- 参考自: https://zhuanlan.zhihu.com/p/343290293
- 命令行交互
    - 单选 多选 文本输入
    - 帮助文档
    - 命令有误, 猜测用户意图
    - node版本检查
- 创建项目
    - /<name>: 创建对应目录
        - 检查名称是否符合npm命名规则
        - 如果项目已经存在,是否进行覆盖
    - . : 在当前目录下进行初始化
- 错误处理
    - 捕获整个过程的异常, 出现错误时终止进程
- 初始化git
- 初始化readme.md, 根据输入的上下文信息,写入最终额度readme.md
- 安装依赖
- 判断当前的npm源
- 生成项目所需要的代码
- 将内存中的文件输出到磁盘

## 常见问题
Q：webpack怎么通过脚本的方式，识别serve和build的命令？  
A：
    https://webpack.docschina.org/api/node/
    https://webpack.js.org/api/cli/
    用webpackCli这个包去解析命令

Q：怎么写测试？
- 目录结构是否符合预期
- 依赖是否全部安装完毕
- 各个命令是否由生效？
    - create \<name\>：是否生成了对应的目录？
    - init: generate && install 
    - generate：生成目录结构：目录结构是否符合预期？
    - install: 安装项目依赖：依赖是否安装完毕，没有缺失？
    - dev: 启动项目：是否按照预期端口，启动进程服务常驻？
    - test: 测试项目：测试是否正常执行进程？
    - build: 构建项目：是否生成的对应的样式、脚本？

Q: vue-cli是怎么实现下载包,然后先不写入node_modules?
A: 
    https://www.cnblogs.com/ygunoil/p/13032983.html#_label1_4
    https://github.com/vuejs/vue-cli/blob/4ce7edd3754c3856c760d126f7fa3928f120aa2e/packages/%40vue/cli/lib/util/executeCommand.js#L57
    https://www.jianshu.com/p/fe174b7eeee3
