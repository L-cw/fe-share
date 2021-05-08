const { config } = require("vuepress-theme-hope");
const sideBar = require('./sideBar')
const navBar = require('./navBar')

module.exports = config({
  title: '进击的学霸的博客',
  description: '代码写出来是给人看的，附带能在机器上运行',
  head: [
    ['link', { rel: 'icon', href: '/logo-white.png' }]
  ],
  port: 2333,
  theme: 'vuepress-theme-hope',
  themeConfig: {
    name: '进击的学霸',
    hostname: 'https://fe.lovem.fun',
    lastUpdated: '最新修改时间',
    mdEnhance: {
      enableAll: true,
    },
    nav: navBar.zh,
    sidebar: sideBar.zh,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    },
    blog: {
      links: {
        Github: "https://github.com/L-cw",
        Email: "goodlcw1@163.com",
      },
      timeline: '山川异域'
    }
  }
})