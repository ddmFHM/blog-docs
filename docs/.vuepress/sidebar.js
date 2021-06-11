module.exports = {

  /* 前端部分 start */

  '/前端/HTML/': [
    {
      title: 'HTML',   
      collapsable: true, 
      sidebarDepth: 2,
      children: [
        '标签'
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
        '行级元素与块级元素',
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
        '集合类型',
        'DOM',
        '内存',
        '浏览器缓存'
      ]
    }
  ],

  '/前端/框架/': [
    {
      title: 'Vue',   
      collapsable: false, 
      sidebarDepth: 1,
      children: [
        'Vue',
        'Vue-router',
        'Vuex',
        'Vuepress'
      ]
    },
    // {
    //   title: 'React',   
    //   collapsable: false, 
    //   sidebarDepth: 1,
    //   children: [
    //     '',
    //     'Vue'
    //   ]
    // },
  ],

  '/前端/模块化/': [
    {
      title: '模块化',   
      collapsable: false, 
      sidebarDepth: 2,
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

  /* 网络部分 start */

  '/网络/': [
    {
      title: '网络',   
      collapsable: true, 
      sidebarDepth: 2,
      children: [
        '',
        '跨域',
        'HTTP请求',
        'HTTP缓存',
        'TCP'
      ]
    }
  ],

  /* 网络部分 end */

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

  /* 算法部分 start */
  '/算法/': [
    {
      title: '算法',   
      collapsable: false, 
      sidebarDepth: 2,
      children: [
        '',
        '排序算法'
      ]
    }
  ],
  /* 算法部分 end */

  /* 面试部分 start */

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

  /* 面试部分 end */
}