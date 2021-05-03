const { navbarConfig } = require("vuepress-theme-hope");

module.exports = {
  zh: navbarConfig(
    [
      {
        text: '编程',
        items: [
          {
            text: '前端',
            items: [
              { text: '编码规范', link: '/code/standard/' },
              { text: '鱼塘', link: '/code/fishPond/' },
              { text: '微信小程序', link: '/code/mini-program/' },
            ]
          },
          {
            text: '代码块',
            items: [
              { text: 'CSS', link: '/code/css/' },
              { text: 'JavaScript', link: '/code/js/' },
              { text: 'Vue 组件', link: '/code/components/' }
            ]
          }
        ]
      },
      {
        text: '随笔',
        items: [
          { text: '琐事', link: '/code/essay/' }
        ]
      },
      {
        text: '关于',
        prefix: '/code/about/',
        items: [
          { text: 'Me', link: 'me' },
          { text: '建站日志', link: 'website' },
          { text: '友情链接', link: 'friends' },
        ]
      },
      { text: 'Github', link: 'https://github.com/L-cw/fe-share' },
    ]
  )
}