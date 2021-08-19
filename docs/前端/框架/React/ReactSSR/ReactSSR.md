# React SSR

> 通过编写一个小小的 SSR 框架来理解

## 简介

## 最简单的服务端直出

通过`express`启动一个服务器，并监听对应端口，直接返回`HTML`内容

- 第三方库：`express`

  ```shell
    # 先初始化项目
    [bizhi@192 miniSSR]# yarn init -y
    [bizhi@192 miniSSR]# yarn add express
  ```

- 在根目录下创建 server 文件夹、创建 index.js 文件作为服务端入口文件

  ```
    .
    ├── client
    ├── components
    ├── package.json
    ├── server
    │   └── index.js
    └── yarn.lock
  ```

- 输出一个 `Hello World`

  ```js
    const express = require('express')
    const app = express()
    // 监听端口号为5577
    const port = 5577 

    // 配置路由访问、访问 / 时返回 Hello World
    app.get('/', (req, res) => {
      res.send('Hello World')
    })

    // 监听端口，并在控制台打印一句提示
    app.listen(port, () => {
      console.log(`[miniSSR]: port ${port} is listen.`)
    })
  ```

- 启动服务

  ```shell
    [bizhi@192 miniSSR]# node server/index.js
  ```

- 此时访问页面 `http://localhost:5577` 即可看到页面打印出 `Hello World`