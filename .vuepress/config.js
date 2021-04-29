module.exports = {
  title: '进击的学霸的博客',
  description: '代码写出来是给人看的，附带能在机器上运行',
  head: [
    ['link', { rel: 'icon', href: '/logo-white.png' }]
  ],
  port: 2333,
  theme: 'vuepress-theme-hope',
  themeConfig: {
    name: '进击的学霸',
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
          title: 'vue 相关',
          path: '/code/fishPond/about-vue',
          children: [
            "about-vue/vue-list-mixin"
          ]
        },
        {
          title: '插件使用记录',
          path: '/code/fishPond/about-plugin',
          children: [
            'about-plugin/Element-UI-Record',
            'about-plugin/Webpack-Record',
            'about-plugin/elementui-form-validate'
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
    },
    blog: {
      links: {
        Github: "https://github.com/L-cw",
        Email: "goodlcw1@163.com",
      }
    }
  }
}