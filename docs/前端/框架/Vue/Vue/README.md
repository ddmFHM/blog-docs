# Vue

## Vue 生命周期

<img src="/lifecycle.png" width="80%">

1. 生成vue实例

2. 初始化事件和生命周期钩子

3. `beforeCreate` 实例初始化之后，数据 observer 变为响应式之前被调用

4. 初始化inject provide state

5. `created` data已经初始化、但是dom树并未挂载

6. 判断是否有el对象，没有的话就挂载，有的话判断是否有模板

    - 有模板就把模板转换为`render`函数，然后通过`render`创建dom树
    
    - 没有则编译el对象外层html作为模板

7. `beforeMount`: dom挂载前被调用

8. 创建$el，替换成真实dom

9. `mounted`: 挂载完成，dom树已经渲染到页面，可以进行dom操作

10. `beforeUpdate`: 数据被更新调用

11. `updated`: 虚拟dom重新渲染补丁以最小dom开支来重新渲染dom

12. `beforeDestory`: 实例销毁之前调用，还能访问到数据

13. 清除watcher、子组件事件监听器等

14. `destory`组件销毁后调用

### 创建实例

1. 初始化操作，设置一些私有属性到实例中

2. 运行生命周期钩子函数 `beforeCreate`

3. 进入注入流程：处理属性、computed、methods、data、provide、inject，最后使用代理模式将它们挂载到实例中

4. 运行生命周期钩子函数 `created`

5. 生成`render`函数：如果有配置，直接使用配置的`render`，如果没有，则使用运行时编译器，把模板编译为`render`

6. 运行生命周期钩子函数 `beforeMount`

7. 创建一个watcher，传入一个函数`updateComponent`,该函数会运行`render`，把得到的`vnode`在传入`_update`函数执行

   - 执行`render`过程中会收集所有依赖、依赖变化时会重新运行`updateComponet`

   - 执行`_update`函数过程触发`patch`函数，目前无旧树，直接为当前虚拟dom树每个普通节点生成真实DOM

   - 如果遇到创建一个组件的vnode，则会进入组件实例话流程，和vue实例化流程基本一致，最终会把生成的组件实例挂载vnode的componentInstance属性

## Vue 虚拟DOM

- 什么是虚拟Dom

  虚拟DOM本质上是一个普通JS对象，用以描述界面结构（Vue._vnode）

  Vue中每个组件都有一个render函数，render函数会返回一个虚拟dom树，意味着每个组件都对应一颗虚拟dom树

- 为什么用虚拟Dom

  vue中渲染视图会调用render函数、渲染不仅发生再组件创建时，也发生在视图依赖的数据更像时，若渲染时直接使用真实DOM，由于操作真实DOM性能开销比较大，会降低渲染效率

- 虚拟DOM转换为真实DOM

  组件实例首次渲染时，会先生成虚拟dom树，然后根据虚拟dom树创建真实dom，并挂载到页面合适位置。

  如果一个组件受到响应式数据变化影响，重新渲染，会重新调用render函数，创建一个新的虚拟dom树，然后新树和旧树对比，找到最小更新量，然后更新必要的虚拟dom节点，然后按照这些更新过的虚拟节点，更新真实DOM

- 模板和虚拟dom

  vue中有一个compile模块，负责将模板转换为render函数

  编译分成两步：

  1. 模板字符串转换为AST
  2. AST转换为render函数

## Vue 响应式原理

响应式数据的实现目的就是，当对象本身或者它的属性变化时候，会运行一些函数，常见的比如`render`函数(`this.$watch`等)

具体现实上，用到了几个核心部件：

1. Observer

2. Dep

3. Watcher

4. Scheduler

### Observer

Observer： 把一个普通对象转换为响应式对象

Observer把对象的每个属性通过`Object.defineProperty`转换为带有`getter`和`setter`的属性（递归遍历对象所有属性）

当访问或设置属性时候，就可以通过这两个函数做一些其他处理

（发生在`beforeCreate`之后，`created`之前）

由于只能遍历到对象的当前属性，无法检测到将来动态增加或删除的属性，因此vue提供了`$set`和`$delete`两个实例方法。

对于数组Vue会更改它的隐式原型（`pop`、`push`、`revese`、`shift`、`sort`、`splice`、`unshift`）

数组 --隐式原型--> Vue自定的对象 --隐式原型--> `Array.prototype`

Observer目标：让一个对象，能被Vue感知到它的读取、赋值、内部数组变化等

### Dep

解决读取属性、属性变化时具体要做什么事

Vue会被响应式对象中每个属性、对象本身、数组本身创建一个`Dep`实例，每个实例都能做以下事情

- 记录依赖：谁在使用我
- 派发更新：我变化了，通知再使用我的

当读取响应式对象的某个属性时，会进行**依赖收集**：有人使用我(`getter`时，记录依赖 `dep.depend()`，比如模板中使用了`obj.a`属性，则表示`render`函数中使用到了`obj.a`,`obj`和`obj`内的`a`都会记录依赖)

当它改变了某个属性时，会派发更新：通知使用我的人，我改变了 (`setter`时，派发更新 `dep.notify()`)

### Watcher

解决Dep如何知道谁在使用我

不直接执行函数，把函数交给`watcher`去执行，`watcher`是一个对象，每个函数执行时都创建一个`watcher`，通过`watcher`去执行

`watcher`会设置一个全局变量，让全局变量记录当前负责执行的`watcher`等于自己，然后执行函数，函数执行过程中，如果发生记录依赖（`dep.depend()`）那么，`Dep`就会把当前全局变量记录的`watcher`记录下来，表示当前全局变量的`watcher`使用了我

当`Dep`进行派发更新时，就会通知之前记录使用过我的`watcher`我发生改变了

- 每个vue组件实例，至少对应一个`watcher`，该`watcher`记录了组件的`render`函数

- 当数据发送变化时，`dep`就会通知该`watcher`，而`watcher`重新运行`render`函数，让界面重新渲染，并且同时重新记录当前依赖

### Scheduler（调度器）

Dep通知watcher后，watcher执行重新运行函数，可能导致频繁运行

实际上Watcher接收到变化后，并不会立即执行对应函数，而是把自己交给调度器Scheduler

调度器维护一个执行队列，该队列同一个watcher仅会存在一次，watcher不会立即执行，会通过一个`nextTick`的工具方法，把这些需要执行的watcher放入到事件循环的微队列中，`nextTick`具体做法就是通过`Promise`完成的。

当响应式数据变化时，render函数异步执行，且在微队列中

```js
  nextTick((fn) => {
    Promise.resolve().then(fn)
  })
```

### 总体流程

1. 原始对象通过Observer变为响应式对象（通过defineProperty 设置每个属性的getter和setter可以做出附加操作，递归所有属性）

2. 创建dep，处理getter和setter时要做的事情，每个响应式数据都有一个Dep实例，在getter时可以进行依赖收集，记录谁在使用该属性。setter时可以通知使用该属性的地方，属性发生改变了。

3. 如何进行依赖收集需要使用到watcher，用以记录依赖。也就是每次执行函数时，不直接执行，通过watcher去执行，每个函数都有一个watcher（render、watch函数等）。watcher会设置一个全局变量，记录当前watcher，然后执行函数，函数执行过程中，如果发生了依赖收集（`dep.depend()`），就把当前全局变量记录的watcher记录下来。当触发属性的setter事件后，Dep会派发更新，通知已经记录的watcher属性发生改变。然后watcher会重新运行watcher对应的函数，重新渲染页面，并重新记录依赖

4. 当dep派发更新后，watcher会重新执行对应函数，可能会导致函数频繁运行（如一个方法内，多次设置属性则每次设置都会触发），因此需要一个Scheduler调度器来处理，每次watcher收到派发更新通知后，不直接执行函数，交给一个调度器处理，调度器维护一个队列，每个watcher仅存在一次，调度器会将需要执行的watcher通过nextTick放入事件循环的微队列（Promise）