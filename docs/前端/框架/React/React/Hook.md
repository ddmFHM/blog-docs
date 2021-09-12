# Hook

## Hook 概览

>  React >= V16.8

## Hook 规则

::: tip 规则 - 调用位置
只能在函数最外层调用 Hook 不能在循环、条件判断、子函数中调用
:::

- 原因

Hook 调用的方式决定了不能按照上述情况编写代码

Hook 调用的顺序在每次渲染中都是相同的

在 **Fiber 架构** 中，每个组件都对应有一个 [Fiber 节点 ](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiber.new.js#L117)，Fiber 节点中有一个属性 `memoizedState`, 该属性指向函数组件的 Hook **链表** 的头结点（即函数组件中的第一个 Hook），后面的所有组件依次连接在该链表上。调用的时候从 Hook 链表的第一项开始依次往后调用。

```jsx
  function FuncComp() {
    // apple useState and useEffect
    const [appleNum, setAppleNum] = useState(10)
    const fn1 = () => console.log('苹果数量发生了变化')
    useEffect(fn1, [appleNum])

    // banana useState and useEffect
    const [bananaNum, setBananaNum] = useState(20)
    const fn2 = () => console.log('香蕉数量发生了变化')
    useEffect(fn2, [bananaNum])

    // ...
  }
```

- 首次渲染（此时 `fiber.memoziedState` 为 `null`）
  
  1. 使用 useState 存储 appleNum 苹果数量 => 链表节点存储 appleNum 值为 10

  2. 添加 effect 保存 fn1 函数  => 链表下一个节点存储 fn1

  3. 使用 useState 存储 bananaNum 香蕉数量 => 链表下一个节点存储 bananaNum 值为 20

  4. 添加 effect 保存 fn2 函数 => 链表下一个节点存储 fn2

  5. 最后在 `fiber.mempziedState` 上形成一个链表

  <img src="/前端/框架/React/Hook1.png" style="border: 1px solid black">

- 后续渲染时 （此时 `fiber.memoziedState` 存有一个链表）

  1. 读取链表节点（hook），读取 appleNum 得到值为 10 （存在 Hook 链表时忽略参数）

  2. 替换保存 fn1 的 effect

  3. 读取链表节点（hook），读取 bananaNum 得到值为 20 （存在 Hook 链表时忽略参数）

  4. 替换保存 fn2 的 effect

  <img src="/前端/框架/React/Hook2.png" style="border: 1px solid black">

- 若违反 Hook 规则

```jsx
  function FuncComp() {
    // apple useState and useEffect
    const [appleNum, setAppleNum] = useState(10)
    const fn1 = () => console.log('苹果数量发生了变化')
    useEffect(fn1, [appleNum])

    // banana useState and useEffect
    if (appleNum <= 10) {
      const [bananaNum, setBananaNum] = useState(20)
    }
    const fn2 = () => console.log('香蕉数量发生了变化')
    useEffect(fn2, [bananaNum])
    // ...
    setAppleNum(20)
  }
```

- 首次渲染与之前一致

  - 当 hook 调用完毕后，又调用了 `setAppleNum(20)`，此时 hook 链表第一个节点的值就存储为20

  <img src="/前端/框架/React/Hook4.png" style="border: 1px solid black">

- 后续渲染（`fiber.memoziedState`上存储有 hook 链表）

  1. 读取链表节点 appleNum 值为 20

  2. 替换保存 fn1 的 effect

  3. 此时第三个 hook 外的 if 判断失败跳过第三个 hook

  4. 替换保存 fn2 的 effect 失败，此时读取的是 hook 链表第三个节点的内容

  5. 后续若有其他 hook 则依次都读取前一个，都会失败

  <img src="/前端/框架/React/Hook3.png" style="border: 1px solid black">

---

::: tip 规则 - 调用位置    
- 在React 函数组件中调用 Hook
- 在自定义 Hook 中调用其他 Hook
:::

## [useState](https://zh-hans.reactjs.org/docs/hooks-state.html)

### 基本用法

- 参数更新

  ```jsx
    // 调用 useState 传入初始值 initialState
    // 返回 state数据 和 更新 state 数据的方法
    const [state, setState] = useState(initialState)
    // 更新 state 数据为 newState
    setState(newState)
  ```

  在更新函数内传入一个的 state 数据将作为新的 state 数据

  ```js
    const [state, setState] = useState(0)
    // ...
    <button onClick={() => {
      setState(state + 1) // => state = 1
      setState(state + 1) // => state = 1
      setState(state + 1) // => state = 1
    }} >click</button>
  ```

<!-- 异步更新 -->

- 函数式更新

  ```js
    setState(prevState => prevState + 1)
  ```

  函数式更新数据接受一个函数，函数的参数为最新的state数据，返回值将作为更新的state值

  ```jsx
    const [state, setState] = useState(0)
    // ...
    <button onClick={() => {
      setState(preState => preState + 1) // => state = 1
      setState(preState => preState + 1) // => state = 2
      setState(preState => preState + 1) // => state = 3
    }} >click</button>
  ```

- 惰性初始 state

  ```jsx
  const [state, setState] = useState(() => {
    const initialState = complexAndCostlyComputation(props)
    return initialState;
  })
  ```

  若初始值需要经过复杂的计算，但不需要每次都进行重新计算获取值，则可以传入一个函数，该函数只有初始渲染时候被调用。

## useReducer

### 基本用法

[官网用例](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)

### 分析

useReducer 是 useState 的替代方案。

本质上 useState 是一个内置了 reducer 的 useReducer。

代码可见 [mountState ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberHooks.new.js#L1143) [mountReducer ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberHooks.new.js#L638)

`useReducer` 更新时调用 `updateReducer`。
[updateState ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberHooks.new.js#L1168) 调用的也是 updateReducer

```js
function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, (initialState: any));
}

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}
```

## useEffect

<!-- useEffect 不同于 类组件的生命周期函数 -->

```jsx
useEffect(() => {
  // effect code
  return clearFunc()
}, [dep])
```
### 基本用法

- useEffect 可以接收一个副作用函数，通常可以在该函数内进行，网络请求，DOM操作等副作用事件。

- useEffect 通过 `return` 返回一个清理函数，当组件被卸载时会执行清理函数的内容，通常用于移除定时器等操作。首次渲染的时候清理函数也会执行。

- useEffect 第二个参数为一个数组。通常effect每次渲染都会执行，但是可以往该数组内传入依赖项，当数组内有依赖项时，effect只会在依赖项发生变化时才进行调用，若传入空数组则只会在首次渲染时执行一次。

### 分析

- 执行时机

  相较于 `componentDidMount`、`componentDidUpdate` 在浏览器绘制出页面之前执行。

  effect 是在浏览器布局与绘制之后(即浏览器已经渲染出页面后)，在一个延迟时间中被调用。

  由于会在页面渲染后被调用，所以如果在effect里操作dom元素，会导致页面该dom元素在被渲染后又立即被改动，造成视觉上的不一致或闪烁等情况。针对这种情况，可以使用useLayoutEffect来解决。

## useLayoutEffect

- useLayoutEffect钩子与useEffect结构相同，唯一不同之处在于调用的时机。

- useLayoutEffect 会在所有DOM变化之后同步调用 effect。在浏览器执行绘制之前执行。此时浏览器还未渲染出页面。

## useCallback

### 基本用法

## useCallback VS useMemo

> [源码 ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberHooks.new.js#L1404)：<font color="#6B95BF">mountCallback、updateCallback、mountMemo、updateMemo</font>

### 1. mount 挂载

  ```tsx
    function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
      // const hook = mountWorkInProgressHook();
      // const nextDeps = deps === undefined ? null : deps;
      hook.memoizedState = [callback, nextDeps];
      return callback;
    }

    function mountMemo<T>(
      nextCreate: () => T,
      deps: Array<mixed> | void | null,
    ): T {
      // const hook = mountWorkInProgressHook();
      // const nextDeps = deps === undefined ? null : deps;
      const nextValue = nextCreate();
      hook.memoizedState = [nextValue, nextDeps];
      return nextValue;
    }
  ```

  useCallback 和 useMemo 在 mount 阶段代码结构实际上是很相似的(注释掉的部分即为相同的)

  区别在于 useCallback 存储的是传入的函数（代码第4行）

  而 useMemo 存储的是传入的函数执行后的结果 (代码第14、15行)

### 2. update 更新

  ```tsx
    function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
      // const hook = updateWorkInProgressHook();
      // const nextDeps = deps === undefined ? null : deps;
      // const prevState = hook.memoizedState;
      // if (prevState !== null) {
      //   if (nextDeps !== null) {
      //     const prevDeps: Array<mixed> | null = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps)) {
              return prevState[0];
            }
      //   }
      // }
      hook.memoizedState = [callback, nextDeps];
      return callback;
    }
  
    function updateMemo<T>(
      nextCreate: () => T,
      deps: Array<mixed> | void | null,
    ): T {
      // ..相同代码
            if (areHookInputsEqual(nextDeps, prevDeps)) {
              return prevState[0];
            }
      const nextValue = nextCreate();
      hook.memoizedState = [nextValue, nextDeps];
      return nextValue;
    }
  ```

  更新阶段两者都是先进行如下操作

  1. 先获取当前 hook 

  2. 获取当前次调用 hook 传入的依赖项

  3. 获取上一次保存的依赖项

  4. 对比依赖项是否相同

     - 代码中是调用的 [areHookInputsEqual ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberHooks.new.js#L309) 函数，该函数调用的是`is`方法
     - `is` 方法就是通过 Object.is 实现的。 [源码中的objectIs ](https://github.com/acdlite/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/shared/objectIs.js)
  
  5. 若依赖项与上次传入的相同，则把上次存储的 函数(useCallback)/函数调用结果(useMemo) 返回

  6. 若依赖项不同，则按照 mount 相同的方式存储，useCallback 存储函数、useMemo 存储函数调用返回结果

## useMemo

## useRef

## useContext
