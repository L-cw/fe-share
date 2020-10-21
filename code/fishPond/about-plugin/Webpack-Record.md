# 使用 `Webpack` 打包相关问题，记录：

现在的前端中使用 webpack 打包已经是常态了，而打包也偶尔会出现一些奇葩问题，这里对于工作中遇到的 webpack 问题做个记录，让其他同学遇到问题不再挠头

<!--more-->

## `webpack`  打包导致 `css3` 动画显示异常

今天的项目运行的时候发现 `css3` 动画不动了，在微信调试器上可以正常显示，到了手机上显示就有问题，开始是以为是微信浏览器的问题，毕竟微信浏览器本来就不是个省油的灯，后来发现原因是在 `webpack` 打包的问题上，打包后的 `css` 中缺少了 `@keyframes` ，导致动画不能正常显示

### 解决办法一：

在 `static` 中加一个 `css` 文件，在 `index.html` 中直接使用 `link` 标签来访问，简单粗暴

### 解决办法二

使 `webpack` 对指定文件不打包，这样可以将受影响的 `css` 代码单独写在一个文件中来避免造成打包的影响。

### 解决办法三

修改 `vue-loader.conf.js` 文件里面的代码

```js
'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction // 将 isProduction 的值改为 true
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
```

不推荐使用，很显然，改成 `true` 之后，`webpack` 不再对 `css` 资源打包，虽然是解决了问题，但是无疑是下下策

##  `-webkit-box-orient: vertical` 样式打包后丢失

**问题原因：**

`webpack`打包时`autoprefixer`自动移除老式过时的代码

### 解决办法一

```js
.ellipsis2lines{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
}
```

### 解决办法二

粗暴解决，写成行内样式

### 解决办法三

将打包`OptimizeCSSPlugin`配置添加`autoprefixer:{remove: false}`。

```js
//文件： build/webpack.prod.conf.js或者build/webpack.build.conf.js
new OptimizeCSSPlugin({
    cssProcessorOptions: config.build.productionSourceMap ?
        { safe: true, map: { inline: false }, autoprefixer:{remove: false} } :
        { safe: true }
}),
```

