# BFC

> 块格式化上下文

- 规定了在该区域中常规流块盒的布局，BFC内部和外部元素不会有联系，内部不会影响到外部

- 规则

  1. 块级元素撑满整行
  2. 垂直方向依次排布
  3. 无缝相邻的元素进行外边距合并
  4. 自动计算高度，无视浮动元素
  
- 创建BFC

  1. 根标签
  2. 浮动元素
  3. overflow不为visible
  4. display: inline-block / flex / inline-flex / flow-root
