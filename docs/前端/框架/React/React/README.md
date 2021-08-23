# React

## 理念

React 是用 JavaScript 构建快速响应的大型 Web 应用程序的方式

## React 架构

### V16之前的架构

- React15的架构分为两层

  1. Reconciler
  2. Renderer

#### Reconciler

  > 协调器，负责找出变化的组件

  在React15架构可以通过`this.setState`, `this.forceUpdate`, `ReactDOM.render`等API触发更新

  组件更新是，Reconciler协调器会进行以下操作
  - 调用函数组件/类组件的`render`方法，将返回的`JSX`转化为虚拟DOM
  - 将虚拟DOM和上次更新时的虚拟DOM对比
  - 找出本地变化中需要更新的虚拟DOM
  - 通知`Renderer`将变化的虚拟DOM渲染到页面上

#### Renderer

> 渲染器，负责将变化的组件渲染到页面    
> React 支持跨平台，所以有多种Render

  - `ReactDOM`
  - `ReactNative`
  - `ReactTest`
  - `ReactArt`

在每次更新发生时，Renderer接到Reconciler通知，将变化的组件渲染在当前**宿主环境**

#### 缺点

在`Reconciler`中，`mount`的组件会调用`mountComponent`，`update`的组件会调用`updateComponent`。这两个方法都会递归更新子组件。

基于以下原因：

- GUI线程和JS线程互斥
- 主流浏览器刷新率在60Hz 也就是每16.6ms更新刷新一次（一帧）
- 在每一帧内需要完成：JS代码执行、样式布局、样式绘制
- Reconciler和Renderer是交替工作的。

但是由于递归执行比较，一旦开始就无法中止，如果递归比较的层级很深，更新时间超过16ms，超过16ms则一帧都在执行JS，并不会更新样式页面，所以用户就会感觉到卡顿。

所以V16后提出了一种新的解决办法。用可中断的**异步更新**代替~~同步的更新~~（时间切片）

即在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（在源码中，预留的初始时间是5ms）。

当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

### V16后新的React架构

新的React架构分为三层

- Scheduler: 调度器,调度任务的优先级，高优任务优先进入Reconciler

- Reconciler: 协调器

- Renderer: 渲染器

相较于之前的架构，新的架构分为三层，多了一层 schedule 调度器

### Schedule

在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。

#### Reconciler

React15中Reconciler是以递归处理虚拟DOM

React16中Reconciler
```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```
React16中的比较中添加了一个判断 `shouldYield` 来判断是否还有剩余时间

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记。例如

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个Scheduler与Reconciler的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

#### Renderer

Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

