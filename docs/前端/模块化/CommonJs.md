# CommonJs

CommonJs 模块语法不能直接在**浏览器**中运行

> http://javascript.ruanyifeng.com/nodejs/module.html

## 概述

CommonJS规范加载模块是**同步的**，也就是说，只有加载完成，才能执行后面的操作

CommonJs **同步声明**依赖的模块定义

CommonJs 使用 `require()` 指定依赖，使用 `exports` 对象定义暴露的API

调用`require()`会将模块原封不动的加载进来

所有代码都运行在模块作用域，不会污染全局作用域。

无论一个模块在`requrie`中被引用多少次，模块永远是**单例**（模块第一次加载后会被缓存，后续加载会取得缓存的模块）要想让模块再次运行，必须清除缓存。

## `module`对象

CommonJS 规定，每个模块内部，`module`变量代表当前模块

1. `module.exports` 属性

  `module`对象的`exports`属性是对外的接口。

  加载某个模块其实是加载该模块的`module.exports`属性

- 监听事件

  ```js
    var EventEmitter = require('events').EventEmitter;
    module.exports = new EventEmitter();
    // 在导出的模块内编写如下代码，模块被加载一秒后发出ready事件
    setTimeout(function () {
      module.exports.emit('ready');
    }, 1000)

    // 在导入的文件中可以通过以下代码监听ready事件
    var a = require('./a');
    a.on('ready', function () {
      console.log('module a is ready');
    });
  ```

2. `exports`变量

  为了便于代码编写：`var exports = module.exports`;

  对外暴露接口时，可以向`exports`属性添加方法等同于添加在`module.exports`内

  若将`exports`指向其他值，则会切断`exports`和`module.exports`联系，导致`exports`无效

## `require`

1. `require`命令

  `require`命令用于读入并指向一个JS文件，然后返回该模块的`exports`对象。若未发现指定模块则报错。

  - 加载规则

    根据参数的不同格式，`require`命令去不同路径寻找模块文件

    如果以 '/' 开头，则表示加载一个位于绝对路径的模块文件

    如果以 './' 开头，则表示加载一个位于相对路径的（相对于当前脚本）模块文件

    如果不以以上两种开头，则表示加载的是一个默认提供的核心库（例如 fs、http等）、或者是一个位于各级`node_modules`目录的已安装模块

      依次按以下搜索

      1. node 目录下的 模块
      2. 当前目录的`node_modules`(若有的话)
      3. 上级目录的`node_modules`
      ...
      4. 若指定模块未发现，则会尝试为文件名添加.js .json .node 后缀，然后再搜索

2. 模块缓存

所有缓存模块都保存在`require.cache`中。

如果需要删除某个模块缓存，则可以按以下代码：

  ```js
    // 删除指定缓存
    delete require.cache[moduleName];
    // 删除所有缓存
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    })
  ```

- `require.main`

  该属性可以判断模块是直接执行（返回`ture`），还是被调用执行（返回`false`）

3. 模块的加载机制

CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。（模块导出一个值后，模块内部的变化就无法影响导入文件中的该值）

（模块导出变量a，然后提供一个方法将a值改变。模块一旦在另一个文件内导入后，访问变量a，在调用修改a的方法，在访问变量a，得到的a数值不会改变）

