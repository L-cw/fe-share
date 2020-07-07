module.exports = {
  title: '前端资源共享',
  description: '仅作为组内前端技术记录和总结之用',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  port: 2333,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '编码规范', link: '/code/standard/' },
      { text: '鱼塘', link: '/code/fishPond/' },
      {
        text: '代码',
        items: [
          { text: 'CSS', link: '/code/css/' },
          { text: 'JavaScript', link: '/code/js/' },
          { text: 'Vue 组件', link: '/code/components/' }
        ]
      },
      { text: '小程序相关', link: '/code/mini-program/' },
      { text: 'Github', link: 'https://github.com/wenhai974/BU-fe-docs' },
    ],
    sidebar: {
      '/code/standard/': [
        '',
        'css-standard',
        'js-standard',
        'less-standard',
        'vue-standard'
      ],
      '/code/css/': [
        '',
        'variable',
        'base-style',
        'media-query',
        'reset-style',
        'scroll-bar-style',
        'css-overview'
      ],
      '/code/js/': [
        '',
        'js-overview'
      ],
      '/code/fishPond/': [
        '',
        'fe-study',
        'fe-vue-project',
        'fe-and-dev',
        'array-about',
        'Element-UI-Record',
        'Webpack-Record',
        'centos-install-python3'
      ],
      '/code/components/': [
        '',
        'vouchers'
      ],
      '/code/mini-program/': [
        '',
        'wxs'
      ]
    },
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    }
  }
}