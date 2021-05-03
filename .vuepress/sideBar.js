const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = {
  zh: sidebarConfig({
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
    // 鱼塘的侧边栏设置
    '/code/fishPond/': [
      '',
      {
        title: '前端学习',
        prefix: '/code/fishPond/',
        children: [
          'fe-study',
          'fe-vue-project',
          'fe-and-dev',
          'fe-websites'
        ]
      },
      {
        title: '重学前端',
        prefix: '/code/fishPond/',
        children: [
          "restudy-fe/js-object",
          "restudy-fe/js-run"
        ]
      },
      {
        title: 'vue 相关',
        prefix: '/code/fishPond/',
        children: [
          "about-vue/vue-list-mixin"
        ]
      },
      {
        title: '插件使用记录',
        prefix: '/code/fishPond/',
        children: [
          'about-plugin/Element-UI-Record',
          'about-plugin/Webpack-Record',
          'about-plugin/elementui-form-validate'
        ]
      },
      {
        title: '趣味 JavaScript',
        prefix: 'funny-js/',
        children: [
          "js-map"
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
    ],
    '/code/about/': [
      '',
      'me',
      'website',
      'friends'
    ],
    '/code/think/': [
      '',
      'think-0'
    ],
    '/code/essay/': [
      '',
      'essay-0'
    ]
  })
}