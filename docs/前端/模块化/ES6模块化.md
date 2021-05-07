# ES6模块化

ES6 模块化使用 依赖预声明 的方式导入模块

- 规范路径表示方法 `./` 或者 `../` 开头

## 导出

- `export 声明` 导出

  1. `export const a = 1`
  2. `export function() {}`

- `export { 变量符号 }` 导出
  
  1. `var a = 1; export { a }` 

- 默认导出

  1. `export default 默认导出的数据`
  2. `export default { 默认导出的数据 as default }`

## 导入

- `import { 导入的符号列表 } from '模块路径'`

- ```import { name as newName } from '模块的路径'```  导入的同时重命名

- ```import * as moduleA from '模块的路径'``` 导入全部模块内容并且定义该模块的变量名

- ```import '模块路径'``` 运行模块内容(无缓存的情况下)，不导入内容
