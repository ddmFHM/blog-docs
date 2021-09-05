# stack reconciler

> reconciler (协调)

> React V15 之前的架构为 stack reconciler

> react 通过 reconciler 来找出变化的组件和组件变化的部分

## 工厂函数

React 的组件分为两种

- 组合元素（Composite element): 即正常编写的React组件，大写开头，例如 `<App/> <Button />`
- 宿主元素 (Host element): 内置的组件，例如 `<div> <p> <span>`

对于两种元素 React 通过不同的方法进行处理

React 编写的元素会带有 `type` 属性

- 内置元素 `type` 值为字符串 `typeof type === "string"`
- 组合元素 `type` 值为函数 `typeof type === "function"`

React 通过一个工厂函数来返回不同的 **构造函数** 对元素进行处理

![React工厂函数](/前端/框架/React/React工厂函数.png)

```js
function instantiateComponent(element) {
  var type = element.type;
  if (typeof type === 'function') {
    // 用户定义组件
    return new CompositeComponent(element);
  } else if (typeof type === 'string') {
    // 平台特定组件
    return new DOMComponent(element);
  }  
}
```

## 处理元素的类

用类来处理，相较于函数优点在于可以在实例上存储一些需要使用的信息，在后续其他阶段进行使用

## 挂载

### CompositeComponent

`CompositeComponent`类 提供了一个 `mount` 函数用于挂载

`mount` 函数通过 `type` 来判断该组合元素是类组件还是函数组件

- 对于类组件（例如 `App` 组件）

  1. 先获取一个 App 的实例
    ```js
    var publicInstance = new type(props)
    ```

  2. 若有生命周期函数 `componentWillMount` 则调用
    ```js
    if(publicInstance.componentWillMount) {
      publicInstance.componentWillMount()
    }
    ```

  3. 调用 `render` 函数获取 `return` 返回的内容
    ```js
    renderedElemnt = publicInstance.render()
    ```

- 对于函数组件

  1. 调用函数直接调用获取函数组件 `return` 的返回内容
    ```js
    renderedElemnt = type(props)
    ```

- 递归挂载子元素 
  ```js
  var renderedComponent = instantiateComponent(renderedElement)
  this.renderedElement = renderedComponent
  ```

- 处理流程如下图

![React处理元素](/前端/框架/React/React处理组合元素.png)

- 在 `constructor` 阶段将当前元素存储在 `currentElement`
- 在 `mount` 过程中 将当前元素实例存储在 `publicInstance`
- 子内容继续调用 instantiateComponent 返回的子实例保存在 `renderedComponent`

### DOMComponent

对于宿主元素进行处理

1. 获取子元素数组

2. 按照当前元素类型创建DOM元素并保存
  ```js
  var node = document.createElement(type)
  this.node = node
  ```

3. 设置属性
  ```js
  Object.keys(props).forEach(propName => {
    if (propName !== 'children') {
      node.setAttribute(propName, props[propName])
    }
  })
  ```

4. 创建并保存子项（子元素可能是组合元素也可能是宿主元素）
  ```js
  var renderedChildren = children.map(instantiateComponent)
  this.renderedChildren = renderedChildren
  ```

5. 挂载子项，并保存子项mount挂载后返回的节点
  ```js
  var childNodes = renderedChildren.map(child => child.mount())
  childNodes.forEach(childNode => node.appendChild(childNode))
  ```

6. 返回DOM节点 `return node`

- 处理流程如下图

![React处理元素](/前端/框架/React/React处理内置元素.png)

---

- 通过DOMComponent类创建的实例，可以保存与内部DOM组件实例关联的`this.node` 和 `this.renderedChildren`

### 生成的结构

```js
[object CompositeComponent] {
  currentElement: <App />,
  publicInstance: null,
  renderedComponent: [object CompositeComponent] {
    currentElement: <Button />,
    publicInstance: [object Button],
    renderedComponent: [object DOMComponent] {
      currentElement: <div />,
      node: [object HTMLDivElement],
      renderedChildren: []
    }
  }
}
```

组合实例内部存储

- 当前元素 `currentElement`

- 元素类型为类的情况下 类的公共实例 `publicInstance`

- 单次渲染后的内部实例

  - DOMComponent
  - CompositeComponent

宿主内部实例存储

- 当前元素 `currentElement`

- DOM 节点 `node`

- 子内部实例数组，`renderedChildren` (`DOMComponent` / `CompositeComponent`)

最后通过一个函数将完整的数挂载到容器节点中，类似于 `ReactDOM.render()`

```js
function mountTree(element, containerNode) {
  var rootComponent = instantiateComponent(element)
  var node = rootComponent.mount()
  containerNode.appendChild(node)

  var publicInstance = rootComponent.getPublicInstance()
  return publicInstance
}

mountTree(<App />, document.getElementById('root'))
```

## 卸载

之前通过类创建实例时，可以保留每个实例的子节点和DOM节点。

- 对于组合组件，调用生命周期方法并递归卸载子组件

```js
class CompositeComponent {
  // ...
  unmount() {
    var publicInstance = this.publicInstance;
    if(publicInstance && publicInstance.componentWillUnmount) {
      publicInstance.componentWillUnmount()
    }
  }
  
  // 卸载单个组件
  var renderedComponent = this.renderedComponent;
  renderedComponent.unmount()
}
```

- 对于宿主元素，通知每个子项卸载

```js
class DOMComponent {
  // ...
  unmount() {
    var renderedChildren = this.renderedChildren;
    renderedChildren.forEach(child => child.unmount())
  }
}
```
