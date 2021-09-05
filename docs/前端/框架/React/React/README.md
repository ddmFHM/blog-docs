# React

## React 架构

V15 之前的版本使用的是 `stack Reconciler` 架构   

v16 以后的版本使用的是 **`Fiber Reconciler`** 架构

> [Fiber 从 React 16 开始变成了默认的 reconciler。](https://zh-hans.reactjs.org/docs/codebase-overview.html#fiber-reconciler)

### Stack Reconciler

V15 中当有更新发生时，采用递归对比虚拟 `DOM` 节点，找出所**需要变化**的节点，然后进行**同步**更新。即进行 `Reconciler`。

对于 `Stack Reconciler` 可以简化为以下步骤

  1. 获取元素内容

     - 类组件：`new` 出类的实例后 调用生命周期的 `componentWillMount` 后，调用 `render` 函数获取返回的 JSX
     - 函数组件：直接调用函数组件获取 `return` 返回的 JSX

  2. 将 JSX 转换为 虚拟 DOM

  3. 递归对比虚拟 DOM 树 🌲，找出 **需要变化** 的节点

  4. 通知 `Renderer` 将将变化的虚拟 DOM 进行同步更新，渲染到页面上


由于 `Reconciler`的对比虚拟DOM 是<font color="#f40">递归</font>的。当组件嵌套层次很深时候，递归所产生的执行栈会越来越深，且递归<font color="#f40">不能被中断</font>。如果递归花的时间很长，超过了浏览器一帧的执行时间，就会造成卡顿的感觉，且递归执行的时间越长卡顿现象越明显。

::: tip 宿主元素
对于宿主元素(`<div/>`、`<p></p>`等内置的元素) 和 组合元素(`<App />`, `<Button />`等) 处理方式不同
:::


##### 卡顿现象的原因

常见的显示器的刷新率一般为60Hz，也就是16.6ms左右会刷新一次。而浏览器的渲染帧是与设备刷新率一致的。   

一帧的时间内要依次完成 JS执行、样式计算布局、样式绘制。（GUI线程与JS线程不能同时工作)。    

所以当一帧内JS时间过长、就会减少后面两步的执行时间，如果执行JS时间大于1帧的时间，那么这一帧就不会进行样式的操作，用户就不能看到页面的更新，就会产生卡顿的感觉。

<!-- 通常会产生卡顿感的页面都是有用户交互的，而用户交互就会触发JS事件

对于有页面重排重绘、JS计算、JS事件、CSS动画等逻辑处理的情况，浏览器会启用渲染主线程 -->

<!-- 一个主线程依次可以分为以下几个阶段：

- 处理用户输入/设定的操作
- 处理定时器，检测是否到达时间（执行对应的回调）
- 处理开始帧（Begin Frame）即每一帧的事件（例如，`window.resize`, `scroll` ...）
- 处理 `requestAnimationFrame`
- 处理 `Layout` 操作（解析DOM树、CSSOM树、生成渲染树等...）
- 进行 `Paint` 计算层级、获取节点尺寸位置信息等
- 当以上处理完后，一帧时间还有空闲阶段 -->
#### 缺点

在`Reconciler`中，`mount`的组件会调用`mountComponent`，`update`的组件会调用`updateComponent`。这两个方法都会递归更新子组件。

基于以下原因：

- GUI线程和JS线程互斥
- 主流浏览器刷新率在60Hz 也就是每16.6ms更新刷新一次（一帧）
- 在每一帧内需要完成：JS代码执行、样式布局、样式绘制
- Reconciler和Renderer是交替工作的。

但是由于递归执行比较，一旦开始就无法中止，如果递归比较的层级很深，更新时间超过16ms，超过16ms则一帧都在执行JS，并不会更新样式页面，所以用户就会感觉到卡顿。

所以V16后提出了一种新的解决办法。用可中断的**异步更新**（时间切片）代替~~同步的更新~~

即在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（在源码中，预留的初始时间是5ms）。

当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

### Scheduler

如何实现 可中断的异步更新

浏览器端提供了一个 `requestIdleCallback` 方法，当浏览器进行一帧渲染时，如果执行完 JS代码、样式布局、绘制等操作后该帧还有剩余时间，则会调用该函数传入的回调函数。

因此如果要使得页面不会因为长时间执行 JS 代码而卡顿，适合的方案就是在浏览器每帧的剩余时间内进行 React 代码执行。

`requestIdleCallback`能在渲染帧的剩余时间执行回调，但是由于 issue 内回答的原因并没有使用该 API

[Polyfill requestIdleCallback when native is not available ](https://github.com/facebook/react/pull/8833)

### Fiber Reconciler

`React` 在 V16 后重构了核心算法，引入了 `Fiber` 架构

`Fiber` 架构的目标：
  
  - 能够把可中断的任务切片处理。
  - 能够调整优先级，重置并复用任务。
  - 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
  - 能够在 render() 中返回多个元素。
  - 更好地支持错误边界。
