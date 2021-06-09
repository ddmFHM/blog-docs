module.exports = {

  /* 前端部分 start */

  '/前端/HTML/': [
    {
      title: 'HTML',   
      collapsable: false, 
      sidebarDepth: 2,
      children: [
        '语义化标签'
      ]
    }
  ],

  '/前端/CSS/': [
    {
      title: 'CSS',  
      collapsable: false, 
      sidebarDepth: 2,
      children: [
        '',
        '单位',
        'CSS选择器',
        '行级元素 & 块级元素',
        '盒模型',
        'BFC',
        '性能问题'
      ]
    }
  ],

  '/前端/JS/': [
    {
      title: 'JS',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        '',
        '变量',
        '数据类型',
        '函数',
        '异步处理',
        '迭代器 & 生成器',
        '集合类型'
      ]
    }
  ],

  '/前端/模块化/': [
    {
      title: '模块化',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        '',
        'CommonJs',
        'ES6模块化'
      ]
    }
  ],

  '/前端/构建工具/': [
    {
      title: '构建工具',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        '',
        'webpack',
      ]
    }
  ],

  /* 前端部分 end */

  /* 技术部分 start */
  
  '/技术/': [
    {
      title: '前端技术',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        ''
      ]
    },
    {
      title: '后端技术', 
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        '后端/',
        '后端/JWT'
      ]
    }
  ],

   /* 技术部分 end */

  '/面试/': [
    {
      title: '面试',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        '',
        'JS'
      ]
    }
  ]
}