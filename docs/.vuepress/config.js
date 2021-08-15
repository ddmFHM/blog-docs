module.exports = {
  title: '遇事不决 可问春风',
  description: `ddmFHM's technical documentation station`,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
    ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
  ],
  themeConfig: {
    search: true,
    nav: require('./nav'),
    sidebar: require('./sidebar'),
    lastUpdated: '🎈 Last update',
    smoothScroll: true,
    repo: 'ddmFHM/blog-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub'
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['flexsearch', '@vuepress/back-to-top']
  ],
  locales: {
    '/': {
      /* 配置html根标签的lang属性为zh-CN */ 
      lang: 'zh-CN'
    }
  }
}  