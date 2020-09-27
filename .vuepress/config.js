module.exports = {
  title: '前端小记',
  description: '代码写出来是给人看的，附带能在机器上运行',
  head: [
    ['link', { rel: 'icon', href: '/logo-white.png' }]
  ],
  port: 2333,
  themeConfig: {
    lastUpdated: '最新修改时间',
    nav: [
      { text: '首页', link: '/' },
      { text: '编码规范', link: '/code/standard/' },
      { text: '鱼塘', link: '/code/fishPond/' },
      {
        text: '代码块',
        items: [
          { text: 'CSS', link: '/code/css/' },
          { text: 'JavaScript', link: '/code/js/' },
          { text: 'Vue 组件', link: '/code/components/' }
        ]
      },
      { text: '微信小程序', link: '/code/mini-program/' },
      { text: 'Github', link: 'https://github.com/L-cw/fe-share' },
    ],
    sidebar: {
      '/code/standard/': [
        '',
        'css-standard',
        'js-standard',
        'less-standard',
        'vue-standard',
        'eslint-standard'
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
        'js-overview',
        'js-other-tools',
        'js-date-tools',
        'js-amount-tools'
      ],
      '/code/fishPond/': [
        '',
        {
          title: '前端学习',
          children: [
            'fe-study',
            'fe-vue-project',
            'fe-and-dev',
            'fe-websites'
          ]
        },
        {
          title: '重学前端',
          path: '/code/fishPond/restudy-fe',
          children: [
            "restudy-fe/js-object",
            "restudy-fe/js-run"
          ]
        },
        {
          title: '插件使用记录',
          children: [
            'Element-UI-Record',
            'Webpack-Record'
          ]
        },
        {
          title: '趣味 JavaScript',
          path: '/code/fishPond/funny-js',
          children: [
            "funny-js/js-map"
          ]
        }
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