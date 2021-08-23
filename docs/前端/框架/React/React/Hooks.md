# Hooks

理念：践行代数效应

## useState

State Hooks 能让函数组件同类组件一样拥有自己的状态。

```jsx
const [count, setCount] = useState(0)
console.log(count) // 0
setState(1)
console.log(count) // 1
```

- useState可以传入一个参数，这个参数就是状态的**默认值**

- 调用useState后会返回一个数组数组包含两项，通常使用ES6解构的方式获取数组的两个值
  
  - 第一项：useState存储的状态数据

  - 第二项：更新数据的方法（更新state变量会替换而不是合并
    

- 更新数据的方法有两种调用形式

  - 第一种：直接传入需要更新的数据
    ```jsx
      setCount(count + 1)
    ```
  
  - 第二种：传入一个函数，返回值为更新的数据，函数参数为当前数据
    ```jsx
      setCount((preCount) => {
        console.log(preCount) // 当前的count值
        return preCount + 1
      })
    ```

  - 两者的区别在于异步函数中调用 更新数据方法是否会合并优化，举个例子

    ```jsx
      export default function Count() {
        const [count, setCount] = useState(0)
        return (
          <div>
            // 数据
            <p>{count}</p>
            // 在异步事件中 使用传入数据进行更新
            <button onClick={() => { setTimeout(() => {
              setCount(count + 1)
              setCount(count + 1)
            }, 2000); }}>同步加</button>
            // 在异步事件中 使用传入函数进行更新
            <button onClick={() => { setTimeout(() => {
              setCount((pre) => { return pre + 1 })
              setCount((pre) => { return pre + 1 })
            }, 2000); }}>异步加</button>

          </div>
        )
      }
    ```
  
    - 页面提供了两个按钮，当按钮点击后两秒会进行两次数据加1操作。

      - 如果使用传入数据进行更新，两秒后数据会加1、而不是加2。

        - 因为React为了优化性能、会将多次`setCount`更新函数合并到最近一次更新数据。
        - 相当于是一个闭包，setCount 函数会延迟到最近一次React更新数据时进行调用
        - 此时每次拿到的count都是还未改变的count
        - ```js
            <button onClick={() => { setTimeout(() => {
              setCount(count + 1) // 此时的count未改变值为1 等同于 setCount(1 + 1)
              setCount(count + 1) // 此时的count也为改变 等同于 setCount(1 + 1)
            }, 2000); }}>同步加</button>
          ```

      - 如果使用传入函数进行更新，两秒后数据会加2。

        - 当传入的是一个回调函数时，setState虽然合并了，但是每次拿到的是一个回调函数
        - 函数的参数为已经修改的数据，每次修改完数据都会将新的数据传递到下一个 setCount 的回调函数中
        - 所以点击时数据会加2



第N次调用useState
检查该节点的状态数组是否存在下标N
不存在
  1. 使用默认值创建一个状态
  2. 将该状态加入到状态数组中下标为N
存在
  1. 忽略掉默认值
  2. 直接得到状态值

useState 最好写在起始位置
useState 严禁出现在代码块中（判断、循环等）
useState 返回的函数，引用不变（节约内存空间）
使用函数改变数据，若数据和之前数据完全相等（使用Object.is比较），则不会重新渲染，达到优化效率
使用函数改变数据，传入的值不会和原来的数据合并，是直接替换
强制刷新
  - 类组件：this.forceUpdate()  不会运行shouldComponentUpdate
  - 函数组件：
    `const [, forceUpdate] = useState({})`
    `forceUpdate({})`

函数组件中改变状态可能是**异步的**(在dom事件中)，多个状态变化会合并以提升效率，应该使用回调函数的方式改变状态

## useEffect

Effect Hook 在函数组件中处理副作用

副作用：
1. ajax请求
2. 计时器
3. 其他异步操作
4. 更改真实DOM
5. 本地存储
6. 其他会对外部产生影响的操作等

useEffect 
- 第一个参数
  - 接受一个函数（副作用函数）作为参数，接受的函数就是用于副作用操作的函数
- 返回值[可选]：返回值是一个函数（清理函数）
  - 首次加载不会运行清理函数
  - 重新加载后会先运行清理函数，在渲染之后运行
  - 组件被销毁时一定会运行
- 第二个参数
  - 一个数组，记录副作用函数的依赖项
  - 当组件重新渲染后，只有依赖数据与上次不一样，才会执行副作用

- tip
1. 副作用函数执行，是在页面完成正式UI渲染后，用户看到效果后，是异步的，不会阻塞浏览器
  - 与类组件中 componentDidMount和componentDidUpdate不同
    类组件两个生命周期函数 是在更改了真实DOM，但是用户还没看到UI更新，是同步的
    useEffect是在修改了真实DOM，用户已经看到UI更新，是异步的

2. 每个函数组件中可以多次使用useEffect

3. 副作用函数中，如果使用了函数上下文中的变量，由于闭包的影响，会导致副作用函数中变量不会实时变化

4. 每次渲染后，新的副作用函数会覆盖之前的副作用函数，尽量保持副作用函数稳定（每次传入的函数保持同一个）

## 自定义hook

把常用的、跨越多个组件的hook功能，抽离成一个函数，该函数即为自定义hook
- 自定义hook 要按照hook规则实现
  - 以useXXX开头
  - 调用自定义hook时要放在函数顶层（不放在代码块内）

例如：很多组件都要在第一次加载完成后 发送请求获取XX数据

## useReducer

- 关于reducer

  Redux 最初来自 Flux: facebook出品的一个数据流仓库
  1. 规定了数据单向流动
  2. 数据存储在数据仓库
  3. action是改变数据的唯一原因

- useReducer

  第一个参数，reducer函数
  第二个参数，初始值
  第三个参数，一个回调函数，该函数的返回值会作为初始值，该回调函数有一个参数，参数就是第二个参数的值，一般用于第二个参数需要复杂计算才能得到初始值的情况使用，比如第二个参数来自props，需要计算后才能的到初始值

## useContext

获取上下文数据

## useCallback

函数的地址每次重新渲染都会发生变化，导致子组件跟着重新渲染，若子组件是PureComponent，就会失效

该函数有两个参数
- 第一个参数：
  - 函数。useCallback会固定该函数的引用，只要依赖项没发生变化，则始终返回固定的函数引用
- 第二个参数
  - 依赖项

## useMemo

保持一些比较稳定的数据，通常用于性能优化

## useRef

能产生一个具有唯一地址的对象

## 模拟实现 Hooks

```js
let isMount = true; // true 是挂载阶段 false 非挂载阶段（即为更新阶段）
let workInProgressHook = null; // 指针、指向当前内存中正在执行的hook
const fiber = {
  // 指向当前fiber对应的节点
  stateNode: App,
  memoizedState: null
}

/**
 * 调度器
 * 调度任务
 */
const schedule = function () {
  // 调度的时候 将指针指向当前fiber节点
  workInProgressHook = fiber.memoizedState
  // 运行当前fiber对应组件
  const app = fiber.stateNode()
  // 调用过后就等于已经挂载了
  isMount = false
  return app
}

/**
 * useState
 * @param {any} initialState 
 */
const useState = function(initialState) {
  // 标记当前处理的是哪个hook
  let hook;
  // 判断是否为第一次渲染
  if (isMount) {
    // 初次渲染的时候肯定是没有hook的
    // 创建一个新的hook
    // - memoizedState: 用于保存 hook的数据 （第一次渲染使用默认数据）
    // - next: 当前组件可能多次调用hooks每个hook是通过链表进行链接保存的，此处next指向下一个hook（首次渲染的时候为null）
    // - queue：环状链表，保存当前hook需要执行的更新函数（可能有多个，所以是一个环状链表）
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null
      }
    }

    if (!fiber.memoizedState) {
      // 如果fiber节点上没有memoizedState
      // 则当前创建的是该组件的第一个hook
      fiber.memoizedState = hook
    } else {
      // 如果fiber节点上存在memoizedState
      // 此时就把新创建的hook链接在workInProgressHook的后面
      // 因为如果已经存在memoizedState则，当前正在执行的hook指针（workInProgressHook）已经存在指向了
      workInProgressHook.next = hook
    }
    // 创建处理完后、将当前正在执行的hook指针指向当前创建的hook
    workInProgressHook = hook
  } else {
    // 如果是第二次渲染
    // 拿到当前指向的hook（现在要开始处理这个hook了）
    hook = workInProgressHook
    // 将指针指向下一个hook（因为当前hook已经要执行了，等此次调度完毕后，当前正在执行的指针就应该是指向下一个hook的）
    workInProgressHook.next = workInProgressHook
  }

  // 开始处理hook
  // 1. 先拿到hook上的数据
  let baseState = hook.memoizedState
  if (hook.queue.pending) {
    // 如果存在 需要执行的更新函数队列
    let firstUpdate = hook.queue.pending
    do {
      baseState = firstUpdate.action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate != hook.queue.pending.next)

    hook.queue.pending = null
  }

  // 执行完后baseState更新了，需要重新设置一下
  hook.memoizedState = baseState
  return [
    baseState,
    dispatchAction.bind(null, hook.queue)
  ]
}

/**
 * 处理更新函数
 * @param {*} action 
 */
const dispatchAction = function(queue, action) {
  // update是一个数据结构
  // - action: 更新函数接受的参数
  // - next: 下一个更新的数据（环状链表）
  let update = {
    action,
    next: null
  }

  if (queue.pending == null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }
  // 让当前处理队列指向update
  queue.pending = update
  // 触发依次更新
  schedule()
}

function App() {

  const [num, setNum] = useState(0)
  console.log(isMount)
  console.log(num)
  return {
    onClick() {
      setNum(preNum => preNum + 1)
    }
  }
}

window.app = schedule()
```