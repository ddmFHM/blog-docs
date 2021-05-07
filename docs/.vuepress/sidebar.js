module.exports = {

  /* 前端部分 start */

  '/前端/HTML/': [
    {
      title: 'HTML',   
      collapsable: false, 
      sidebarDepth: 2,
      children: [
        'HTML5新特性'
      ]
    }
  ],

  '/前端/CSS/': [
    {
      title: 'CSS',  
      collapsable: false, 
      sidebarDepth: 2,
      children: [
        'CSS选择器'
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
        '数据类型',
        '函数'
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