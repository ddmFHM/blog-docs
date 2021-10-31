module.exports = {

  /* 前端部分 start */

  '/前端/HTML/': [{
    title: 'HTML',
    collapsable: false,
    sidebarDepth: 2,
    children: [
      '',
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
      '行级元素与块级元素',
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
      '变量',
      '函数',
      '异步处理',
      '迭代器 & 生成器',
      '集合类型',
      'DOM',
      '内存',
      '浏览器缓存'
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
      'webpack'
    ]
  }],

  '/前端/框架/React/': [{
      title: 'React',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'React/',
        'React/Reconciler',
        'React/Hook'
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
        'ReactSSR/ReactSSR'
      ]
    }
  ],

  '/前端/框架/Vue/': [
    {
      title: 'Vue',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'Vue/'
      ]
    },{
      title: 'VueRouter',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'VueRouter/'
      ]
    },{
      title: 'VueX',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'VueX/'
      ]
    },{
      title: 'VuePress',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'VuePress/'
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
        'Docker/安装',
        'Docker/镜像',
        'Docker/容器',
        'Docker/网络',
        'Docker/常用命令'
      ]
    }
  ],

  /* 全栈部分 end */

  /* 语言部分 start */

  '/语言/Rust/': [
    {
      title: 'Rust',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        'Rust/'
      ]
    }
  ],

  /* 语言部分 end */

  /* 基础部分 start */

  '/基础/设计模式/': [{
    title: '设计模式',
    collapsable: false,
    sidebarDepth: 2,
    children: [
      '',
      '工厂模式'
    ]
  }],

  /* 基础部分 end */

  /* 算法部分 start */

  '/算法/': [ {
      title: '排序算法',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '排序算法/'
      ]
    },
    {
      title: '链表',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '链表/',
        '链表/92.反转链表',
        '链表/25.K个一组反转链表',
        '链表/234.回文链表',
        '链表/2.两数相加',
        '链表/19.删除链表的倒数第N个节点',
        '链表/21.合并两个有序链表',
      ]
    },{
      title: '动态规划',
      collapsable: true,
      sidebarDepth: 1,
      children: [
        '动态规划/',
      ]
    }
  ],

  /* 算法部分 end */

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