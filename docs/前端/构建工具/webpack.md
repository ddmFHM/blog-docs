# webpack

## 环境

- 基于nodejs:：webpack打包过程基于nodejs环境（如需要使用到fs库进行文件读取）

- 基于模块化：webpack需要分析模块依赖关系，通过模块化的导入语句分析依赖关系，支持各类模块化标准

## 编译过程分析

编译过程分为三步

1. 初始化配置对象
2. 编译分析
3. 打包结果

### 1. 初始化

产生一个最终的配置对象

- 将CLI参数、配置文件、默认配置合并生成一个最终的配置对象

    ::: tip 优先级
    CLI > 配置文件 > 默认配置
    :::

### 2. 编译分析

1. **创建chunk**

    - 根据入口模块（可能有多个，默认的为`./src/index.js`）创建一个chunk （chunk可以理解为从该入口模块找到的所有依赖的统称）

    - chunk 包含许多属性

      - name: 默认为main

      - id: 唯一编号，开发环境时id与name相同，生产环境为从0开始的数值

      - ...

2. **构建所有依赖模块**

    1. 从入口模块开始，进入后先检查chunk的模块清单是否有当前模块，若有则结束，若无该模块则进行下一步

    2. 通过nodejs的fs模块读取文件内容（读取文件，读出来为字符串，并不执行代码内容）

    3. 进行loader处理得到处理后的字符串

    4. 进行AST抽象语法树分析，分析后可以得到该模块所有的依赖模块，将依赖模块记录

    5. 将依赖模块的依赖函数（导入语句）替换为webpack的依赖函数（如`require`替换为`__webpack__require__`）

    6. 记录当前的模块到chunk的模块清单中

    7. 递归查询第4步分析除的模块依赖，重复上述步骤，最终得到一个记录该入口模块找到的所有依赖模块清单如下

    模块id |  转换后的代码（替换依赖函数）
    |:--|:--|
    ./src/index.js  | xxxxx
    ./src/utils.js  | xxxxx
    ./src/request.js  | xxxxx

![webpack 编译过程](/webpack过程.png)

### 3. 打包结果

1. 按照webpack配置将每个chunk生成的资源清单生成一个资源列表（多个chunk生成多个chunk assets）

2. 该资源列表可以理解为最终生成到dist目录下的文件名以及对应的文件内容例如下表（编译过程后文会进行分析）

    文件名 |  文件内容
    |:--|:--|
    ./dist/main.js  | xxxxx
    ./dist/main.map.js | xxxxx

3. 给每个chunk生成一个chunk hash（按照文件内容生成，可以标识chunk内容是否发生改变）

4. 如果有多个chunk asstes则将多个chunk assets合并生成一个总的assets，产生一个总的hash

5. 通过fs模块，根据总的assets生成文件

## loader

> loader仅对源码进行处理

loader 一般用于处理非js文件的内容，编译过程中读取文件内容后，要先根据文件类型，按照对应的loader处理后才能进行下一步AST抽象语法分析，否则若读取的为css、图片文件等无法进行语法分析

loader 本质上是一个函数，传入源码字符串，将源码字符串处理后返回处理后的字符串

- **处理loader流程**

  1. 判断当前模块是否满足某个规则

      - 匹配上对应规则后读取对应 loader，loader可能有多项需要使用，所以会有一个loader数组

  2. 从数组的最后一项开始依次往前调用loader（最后一个loader处理后返回的结果传递个前一个loader）

  3. 所有loader处理完毕后，移交给下一步语法分析

## plugin

> loader用于代码转化，功能有限，而plugin可以嵌入到webpack编译的流程内。

plugin的本质是一个带有`apply`方法的对象。通常将plugin写成构造函数的形式（构造函数形式可以传递参数）

### 1.compiler

> Compiler 模块是 webpack 的主要引擎，它通过 CLI 传递的所有选项， 或者 Node API，创建出一个 compilation 实例。 它扩展(extend)自 Tapable 类，用来注册和调用插件。

plugin的构造函数内的`apply`方法会被webpack compiler对象调用（创建好compiler对象后会调用`applay`方法）且在整个编译声明周期都可以访问compiler对象

该对象在整个打包过程只有一个（即使使用watch 或者 devServer后重新打包也只有一个）

`compiler`提供了大量钩子函数（hooks），可以在compiler上注册事件.

`compiler.hooks.事件名称.tag('MyPlugin', (param) => { ... })`

常见的事件名称：

- emit: 输出asset到output目录前执行

- run: 开始读取records之前调用

- watchRun: 在监听模式下，一个新的 compilation 触发之后，但在 compilation 实际开始之前执行。

### 2. complation

`compilation` 用于完成后续打包工作

`compilation.hooks.someHook.tap(/* ... */);`

### 3. 常见插件

- clean-webpack-plugin: 清除输出目录

- html-webpack-plugin: 自动生成html模板

- copy-webpack-plugin: 复制静态资源

## webpack 配置

- 可以在CLI中使用参数 例如 `--mode --config`

- entry: 指定入口文件

- output: 出口，指定编译结果文件

## 性能优化

### 构建优化 - 热替换

热替换允许在运行时候更新模块，无需完全刷新

- 配置

index.js文件中需要进行配置

```js
  if (module.hot) {
    module.hot.accept()
    // 具体配置可参阅webpack文档
  }
```

devServer中配置

```js
  module.exports = {
    devServer: {
      hot: true
    }
  }
```

### 手动分包

- **打包公共模块**

公共模块的打包是独立的过程

- 将公共模块单独打包，打包到公共模块目录下，并且生成一个资源清单

  1. 单独打包公共模块，暴露出公共模块的变量名

      ```js
      module.exports = {
        //...
        entry: {
          jquery: ["jquery"],
          lodash: ["lodash"]
        },
        output: {
          filename: "dll/[name].js",
          library: "[name]"
        }
      }
      ```

  2. 使用DllPlugin生成资源清单（manifest.json）

      ```js
      module.exports = {
        plugins: [
          new webpack.DllPlugin({
            path: path.resolve(__dirname, "dll", "[name].manifest.json"), //资源清单的保存位置
            name: "[name]"//资源清单中，暴露的变量名
          })
        ]
      };
      ```

  3. 运行该配置打包即可完成公共模块打包

- **使用公共模块**

原代码根据入口模块正常打包，若发现模块中使用了资源清单中的模块则打包后公共模块代码不会出现在打包后的文件内

  1. 页面中手动引入模块

      ```html
        <script src="./dll/jquery.js"></script>
        <script src="./dll/lodash.js"></script>
      ```

  2. 插件配置

      配置clean-webpack-plugin防止删除Dll目录

      ```js
        new CleanWebpackPlugin({
          // 排除掉dll目录本身和它里面的文件
          cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*']
        })
      ```

  3. 使用DllReferencePlugin控制输出结果

      ```js
        module.exports = {
          plugins:[
            new webpack.DllReferencePlugin({
              manifest: require("./dll/jquery.manifest.json")
            }),
            new webpack.DllReferencePlugin({
              manifest: require("./dll/lodash.manifest.json")
            })
          ]
        }
      ```

### 自动分包

要进行自动分包，需要设置一个分包策略（不需要插件，webpack内部是使用SplitChunksPlugin进行分包的）

分包时候，webpack开启了一个新的chunk对分离的模块进行打包（公共部分是一个新的chunk）

- 配置

  - **chunks**

    1. all: 所有的Chunk都要应用分包策略
    2. async: 默认。仅针对异步chunk应用分包策略
    3. initial: 仅针对普通chunk应用分包策略

  - automaticNameDelimiter： 新的chunk名称分隔符 默认是波浪线~

  - minSize: 当分包达到多少字节后被允许拆分，默认30000字节

  - minChunks: 一个模块被多少个chunk使用后才会进行分包，默认1

  - 缓存组

    - 分包策略基于缓存组

    - webpack按照缓存组优先级依次处理每个缓存组，被缓存组处理过的分包不需要再次进行分包

    - 默认情况下，webpack提供了两个缓存组

    ```js
      module.exports = {
        optimization: {
          splitChunks: {
            // 全局配置
            cacheGroups: {
              // 缓存组
              // 属性名是缓存组名称，会影响到分包的名称
              // 属性值是缓存组配置，继承所有全局配置，也有自己独立的配置
              vendors: {
                test: /[\\/]node_modules[\\/]/, // 匹配到相应模块时候，将这些模块进行打包
                priority: -10 // 缓存组优先级，优先级越高，该策略组越先进行处理，默认值0
              },
              default: {
                minChunks: 2, // 覆盖全局配置，将最小chunk引用数量改为2
                priority: -20,// 优先级
                reuseExistingChunk: true //重用已经被分离出去的chunk
              }
            }
          }
        }
      }
    ```

    - 一般情况下，默认地缓存组就够用了

    - 原理：

      1. 检查每个chunk的编译结果
      2. 根据分包策略，找到满足模块的模块
      3. 根据分包策略，生成新的chunk打包这些模块
      4. 把打包分离出去的模块，从原始的包中移除，修正原始包内的代码

    - 分包会产生代码变动

      1. 分包的代码中，会加入一个全局变量，类型为数组，其中包含公共模块的代码
      2. 原始包的代码中，使用数组中的公共代码

### tree shaking

> 代码压缩可以移除模块中的无效代码
> tree shaking 可以移除模块间的无效代码

某些模块的导出代码不一定会用到
  
- 例如某个模块导出N个方法，实际只用到了其中的若干个方法, 其余的方法并不会被用到

- tree shaking 可以移除掉不会被用到的导出

::: tip tip
  只要是生产环境，webpack默认开启tree shaking

  对于commonJs 导出的第三方库，或者公共代码，tree shaking 无法发挥作用

:::

**tree shaking 原理：**

1. webpack 会从入口文件开始寻找依赖关系

2. 解析模块时，webpack会根据 ES6的模块导入语句来判断，该模块依赖了哪一个模块的导出

    - webpack 选择ES6模块导入语句判断原因

      1. 导入导出语句 是顶层语句 （依赖预声明）
      2. import 的模块名只能是字符串常量
      3. import 绑定的变量不可变

3. 依赖分析完毕后，webpack会根据每个模块每个导出是否被使用，标记未被使用的代码为 dead code 然后交给代码压缩工具处理

4. 代码压缩工具 最终会移除掉 dead code 代码

---

- **Tips**

  1. 因为js语言特性，以及webpack本身原因，为了确保代码能正常运行，webpack不会移除对象中任何信息

     - 所以编写代码时尽量：

      1. 使用 `export xxx` 导出，不使用 `export default { xxx }` 导出
      2. 使用 `import { xxx }` 导入，不使用 `import xxx from "xxx"` 导入

- 副作用问题

  - webpack 的 tree shaking 原则： 保证代码正常运行
  - 所以当 webpack 无法确定某个模块是否有副作用时候，就会将其视为有副作用
  - 可以在Package.json 中加入 sideEffects 来标记无副作用的文件
