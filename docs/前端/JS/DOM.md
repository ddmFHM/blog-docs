# DOM

## DOM事件

JS 与 HTML 的交互是通过事件实现的。

可以使用在事件发生时候执行的监听器（处理程序）订阅事件。（即观察者模式）

### 事件流

同心圆：例如触发一个点击事件，点击的不光是按钮，还有它的容器以及页面

由于旧版浏览器不支持，实际中不太会使用时事件捕获，通常建议使用事件冒泡

#### 事件冒泡

IE事件流被称为事件冒泡。事件从最具体的元素（文档最深的节点）开始触发，然后向上依次触发到`document`

事件会一直冒泡到window对象

#### 事件捕获

事件捕获是指从最外层首先收到事件，然后依次往内触发事件，直到最终触发的节点。

事件捕获实际上是为了在 事件**到达最终目标前** 拦截事件

所有浏览器都是从 `window` 开始捕获时间，DOM2 Events规范规定从 `document` 开始

### DOM 事件流

DOM2 Events 规范规定事件流分为三个阶段

1. 事件捕获
2. 到达阶段
3. 事件冒泡

事件捕获最先发生，可以提前拦截事件（捕获阶段从 `document` 到 `<html>` 再到 `<body>`就结束了）
然后是目标元素接收到事件
最后进行树碱茅坡，事件反向传播`document`

### 事件注册

- DOM 0

  - `element.onclick = function () {}`
  - 通过添加给DOM对象onxxx 事件处理属性添加 处理函数即可
  - 要取消监听赋值为null即可 `elemnt.onclick = null`
  - 重新赋值新的函数即可覆盖之前的事件处理函数（因此只可注册一个事件）

- DOM 2

  - `element.addEventListener('事件名', 函数名, 是否为捕获阶段事件[boolean])`
  - 可以注册多个事件，按照注册顺序依次执行
  - 第三个参数为是否在捕获阶段触发
  - 移除事件：`elemnt.removeEventListener('事件名', 函数名, 是否为捕获阶段事件)`

  ```html
    <div>
      <button>点击</button>
    </div>

    <script>
      div.addEventListener('click', () => {
        console.log('div 捕获')
      }, true)

      div.addEventListener('click', () => {
        console.log('div 冒泡')
      }, false)

      btn.addEventListener('click', () => {
        console.log('btn 捕获')
      }, true)

      btn.addEventListener('click', () => {
        console.log('btn 冒泡')
      }, false)

      // 输出顺序：div捕获 -> btn捕获 -> btn冒泡 -> div冒泡
    </script>
  ```