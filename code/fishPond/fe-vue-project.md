# 前端 Vue 项目简介

对前端 Vue 项目的一个简单介绍，便于快速上手项目开发，对于前端的学习入门，请参照 [前端学习入门](http://code-fe.lovem.fun/code/fishPond/fe-study.html) 

## 开发环境

node v10.13.0  去 [官网](https://nodejs.org/zh-cn/) 下载并安装；

编辑器： 推荐 [VS Code](https://code.visualstudio.com/)

### VS Code 开发辅助

工欲善其事，必先利其器

#### 插件

以下插件直接在 VS Code 插件市场中搜索安装即可

 	1. vutur ，为 vue 文件提供代码高亮
 	2. Indent-Rainbow ，让缩进的区域以彩色色块显示

#### 文件模版

[VS Code 中使用文件模版快速生成文件结构](http://blog.lovem.fun/archives/42/)

## 项目文件目录

```bash
├── public  
|  ├── favicon.ico
|  └── index.html
├── src 
|  ├── App.vue
|  ├── api                            # 网络服务相关
|  |  └── user.js                     # 以 user 开头的接口
|  ├── assets                         # 静态资源
|  |  ├── images                      # 图片资源
|  |  |  ├── logo.png
|  |  |  └── not-found.png
|  |  └── styles                      # 样式资源
|  |     ├── common.less              # 公共样式
|  |     ├── element-ui-reset.less    # 重置 ElementUI 样式
|  |     ├── index.less               # 入口文件
|  |     ├── reset.less               # 重置 HTML 标签默认样式
|  |     └── variables.less           # 样式变量配置
|  ├── components                     # 全局公共组件
|  |  └── HelloWorld.vue              # 组件命名以大驼峰的格式
|  ├── main.js                        # 入口文件
|  ├── router                         # 路由
|  |  └── index.js
|  ├── store                          # Vuex 相关配置
|  |  └── index.js
|  ├── utils                          # 工具相关
|  |  ├── codeConfig.js               # 错误码及枚举配置
|  |  ├── filter.js                   # 全局过滤器
|  |  ├── request.js                  # 封装 axios 拦截器处理网络请求
|  |  └── tools.js                    # 工具类文件
|  └── views                          # 页面
|     ├── 404.vue
|     ├── demo
|     |  ├── form.vue
|     |  ├── list.vue
|     |  └── other.vue
|     ├── index
|     |  └── index.vue
|     └── layout
|        ├── Footer.vue
|        ├── Header.vue
|        └── index.vue
├── .env                              # 全局变量
├── .eslintrc.js                      # eslint 配置
├── README.md
├── package.json                      # 项目的配置
└── vue.config.js                     # vue 配置
```

## vue 

以下介绍的 Vue 相关的知识在官方文档上都能找到更详细的介绍 [Vue 官方文档](https://cn.vuejs.org/v2/guide/) 

### template 简介

这块相当于 HTML ，所使用的标签也基本上都是 HTML 标签

模版语法简介：插值，方法，循环，显示控制，使用过滤器，指令，事件

### js 部分

vue 的生命周期：

![Vue 生命周期图示](https://cn.vuejs.org/images/lifecycle.png)

定义变量，函数，路由

### 样式

CSS 与 Less ，为什么使用 Less ，Less 的语法，变量。组件样式使用 scope 解决命名空间

## Demo

Vue 的是一个数据驱动的框架，数据的改变引起视图的变化。下面使用的 UI 框架是 [ElementUI](https://element.eleme.cn/#/zh-CN) ，更多的使用方式请查看他的 [ElementUI 组件文档](https://element.eleme.cn/#/zh-CN/component/installation)

### 简单页面

### 组件

我们为什么要使用组件? 灵活，方便

### 组件传值

组件传值分为父子组件传值和非父子组件传值，前者使用 props 即可解决，后者则需要借助 Vuex 这个全局的状态管理来进行

### 表单和列表 && 获取数据

#### 调试的使用

#### 表单

怎样快速使用 ElementUI 的表单相关组件，表单中的数据绑定，要注意的事情，表单提交

#### 列表

怎样快速使用 ElementUI 的表格相关组件，使用表格配合分页来展示列表数据，数据的获取

#### 获取数据

通过以上两个实例展示前端如何通过调取接口拿到后端服务的返回数据，返回数据格式示例：

```json
{
  errCode: '0',
  msg: '',
  data: {}
}
```

## 代码规范

[前端代码规范一览](http://code-fe.lovem.fun/code/standard/)  

## 项目打包

运行命令 `npm run build` 执行打包，打包后的文件输出在根目录下的 dist 文件夹中

## 项目部署

由于是单页面应用，和传统的多页面应用是不同的，所以 nginx 配置中要注意：

```nginx
location / {
    try_files $uri $uri/ /index.html;
    root   /service/nginx/html/code/;
    index  index.html index.htm;
}
```



## 结语

Vue 的文档是非常完善的，你在 Vue 开发中遇到的百分之八十的问题都可以在文档中找到答案

