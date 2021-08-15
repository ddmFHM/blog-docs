module.exports = {

  /* 前端部分 start */

  '/前端/HTML/': [{
    title: 'HTML',
    collapsable: false,
    sidebarDepth: 2,
    children: [
      '语义化标签'
    ]
  }],

  '/前端/CSS/': [{
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
  }],

  '/前端/JS/': [{
    title: 'JS',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '',
      '数据类型',
      '函数',
      '异步处理',
      '迭代器 & 生成器',
      '集合类型'
    ]
  }],

  '/前端/模块化/': [{
    title: '模块化',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '',
      'CommonJs',
      'ES6模块化'
    ]
  }],

  '/前端/构建工具/': [{
    title: '构建工具',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '',
      'webpack',
    ]
  }],

  '/前端/框架/React/': [{
      title: 'React',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'React/',
      ]
    },
    {
      title: 'ReactRouter',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'React/',
      ]
    },
    {
      title: 'Redux',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'Redux/',
        'Redux/Redux-thunk'
      ]
    },
    {
      title: 'ReactSSR',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'ReactSSR/',
      ]
    }
  ],

  /* 前端部分 end */

  /* 全栈部分 start */

  '/全栈/后端/': [
    {
      title: '后端',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '',
        'JWT'
      ]
    }
  ],

  '/全栈/DevOps/': [
    {
      title: 'DevOps',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        ''
      ]
    },{
      title: 'Docker',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'Docker/',
      ]
    }
  ],

  /* 全栈部分 end */

  '/面试/': [{
    title: '面试',
    collapsable: false,
    sidebarDepth: 1,
    children: [
      '',
      'JS'
    ]
  }]
}