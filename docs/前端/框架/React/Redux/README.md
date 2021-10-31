# Redux

> Redux 是一个使用 action 事件来管理和更新应用状态的模式和工具库。它以集中式 store 的方式对整个应用中使用的状态进行集中管理。确保状态以可预测的方式更新。

- 适用场景

  1. 应用存在大量状态
  2. 状态随着时间推移而频繁变化
  3. 更新状态逻辑比较复杂
  4. 中大型应用，多人协同开发

- 适用数据

  1. 多个地方都需要使用到该数据
  2. 基于该数据会派生出一些数据
  3. 时间旅行调试是否有价值
  4. 是否需要缓存该数据
  5. UI 热重载时是否需要保留数据一致

- 术语

  - action: 具有type字段的普通js对象。（描述程序中发生了什么事）

    - type: 给对应的 action 一个描述性的名字
    - payload: action对象的其他字段，包含了发生的事件所携带的附加信息
    - ```js
        const addUserAction = { type: "users/addUser", payload: userInfo }
      ```
  
  - actionCreator: 创建并返回一个 action，简化创建过程

    - ```js
        const addUserCreator = (userInfo) => ({
          type: "users/addUser",
          payload: userInfo
        })
      ```

  - reducer: 纯函数，接受 state 和 action 对象，决定是否/如何更新状态，并返回新的状态

    - 仅适用 state 和 action 计算新的状态
    - 禁止直接修改 state
    - 纯函数
    - ```js
        const usersReducer = (state, action) => {
          if (action.type === "users/addUser") {
            const { payload } = action
            // 更新状态操作
            const newState = {
              ...state,
              usersList: [
                ...state.usersList,
                payload
              ]
            }
            return newState
          }
        }
      ```
  
  - store: 存储当前 Redux 应用的状态

    - 传入一个 reducer 来创建
    - 具有一个 `getState` 方法，返回应用当前状态值
  
  - dispatch: 更新 state 的唯一方法就是通过 `store.dispatch(action)` 传入 action 对象。（触发一个程序中一个事件）

    - store 会根据 dispatch 传入的 action 对象计算出新的 state

  - selector: 从 store 中截取（切片）出制定的片段

    - 应用较大情况下，减少读取的代码
    - ```js
        const selectUserList = state => state.usersList;
        const userList = selectUserList(state.getStore());
      ```
  

- Redux 数据流

  - 初始

    1. 使用 rootReducer 函数创建 初始 redux store
    2. store 调用 rootReducer，并将返回值保存为初始 state
    3. UI 首次渲染时，UI组件访问 store 当前 state，并用该数据决定渲染内容，同时监听 store 更新

  - 更新

    1. 触发应用某事件 例如 `onClick`
    2. `dispatch` 某个 `action` （触发某个事件）
    3. store 用当前的 state 和 action 运行 reducer，得到新的 state，并将其保存为最新的 state
    4. store 通知 UI 组件，store 发生更新
    5. 每个 UI 检查自己渲染所需的 state 是否发生改变
    6. 发生改变的组件强制使用新状态渲染，并更新页面
  
- thunk 与异步逻辑

  - reducer 是纯函数，但是通常很多状态数据来自异步数据。因此需要专门有地方进行异步数据处理。
  - 可以再某个地方先进行异步数据处理，等待异步完成后在通过 dispatch 触发 action
  - redux 可以使用中间件进行处理（中间件是一种可以添加额外功能的附加组件或插件）
  - 常用 中间件进行异步处理
    - redux 只知道同步 dispatch(action)
    - 中间件允许
      1. dispatch action 是执行额外的逻辑
      2. 暂停、修改、延迟、替换或停止 dispatch 的 action
      3. 编写可以访问 dispatch 和 getState 的额外代码
      4. 教 dispatch 如何接受除普通 action 对象之外的其他值，例如函数和 promise，通过拦截它们并 dispatch 实际 action 对象来代替
    - 例如 redux-thunk 是常用的中间件
      - thunk middleware
        ```js
          const thunkMiddleware = ({ dispatch, getState }) => {
            // 返回一个函数
            return (next) => {
              return (action) => {
                if (typeof action === 'function') {
                  return action(dispatch, getState);
                }
                return next(action);
              }
            }
          }
        ```
      - 可以编写直接包含异步逻辑的普通函数
      - ![thunk](/assets/前端/框架/React/Redux-thunk.gif)
      - 触发 异步事件的 dispatch 进入 middleware 处理，等待异步完毕后再触发同步的 dispatch 修改 state

- redux hook

  > React-Redux 库中包含了几个自定义的 hook （应用中不能直接获取 store 本身进行操作，所以通过 hook 与 store 进行交互）

  - useSelector

    - 可以让我们从 store 状态树中提取出任何部分的数据

    - ` const count = useSelector(state => state.counter.count) `

    - 每当一个 action 被触发，store 更新后，都会重新运行 useSelector，如果返回的数据和上次不同，useSelector 将确保使用最新的状态渲染

  - useDispatch

    - `const dispatch = useDispatch()`
    - 代码中可以直接使用`dispatch(action)`来触发
  
  - Provider

    - 在根组件需要使用 Provider 包裹并传入 store，之后自定义 hook 才可以访问到 store
    - ```jsx
        ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('#root')
        )
      ```

- 