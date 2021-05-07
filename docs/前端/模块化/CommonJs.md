# CommonJs

> commonjs 利用类似立即执行函数的方式，隐藏代码中的模块

导出：`exports`

- 导出的是一个`exports`对象

- 模块开始执行前

  1. nodejs 初始化一个`module.exports`对象
  2. nodejs 声明一个`exports`对象 将其指向`exports = module.exports`
  3. nodejs 开启模块缓存，加载过的模块，会自动使用之前导出的结果

    ```js
      (function(module) {
        module.exports = {}
        var exports = module.exports
        // code
        return module.exports
      })
    ```

:::danger
不要给`module.exports`赋值，赋值则会切断`exports`与`module.exports`的关系
:::

  - 导入：`require`

  - 可以理解为commonjs时同步的，要等到加载完文件并执行完代码后才能继续执行
