## 前后端联调
当前端项目开发阶段遇到要和后端联调的情况该怎么操作呢，由于是前后端分离开发的，一般情况下，前端和后端的项目不是起在同一 IP 下的，这就涉及到浏览器的通源策略的限制会造成跨域而无法访问到；后端提供给我们的接口路径，我们该如何使用来获取我们需要的数据呢，不要慌，接下来就进行介绍

<!--more-->

### 接口文档

前后端在开发前一般会约定一个接口文档，这个文档上主要是后端会提供的接口，每个接口的介绍大致包括：请求参（字段名，类型，是否必填，描述），接口路径，请求类型，返回参（字段名，类型，描述）。示例如下：

> 登录接口示例
>
> ```json
> http请求方式：POST
> http://{url}/user/login
> {
> 	"userName": "commpany@126.com",
> 	"password": "e4629469d2cdff5316cf733377614062"
> }
> ```
>
> 请求参数说明：
>
> | **字段名** | **类型** | **是否必填** | **描述** |
> | ---------- | -------: | ------------ | -------- |
> | userName   |   String | 是           | 用户名   |
> | password   |   String | 是           | 密码     |
>
> 成功的返回JSON数据：
>
> ```json
> {    
> 	"data":{
>     	"expiresIn":7200,
>     	"userToken":"ZCHFEdduserietenf0123"
>     },
>     "errCode": "0",
>     "msg": "成功"
> }
> ```
>
> 响应参数说明：
>
> | **字段名** | **类型** | **描述** |
> | ---------- | -------- | -------- |
> | expiresIn  | Long     | 有效时间 |
> | userToken  | String   | 令牌     |

前端可以依照文档中的字段名进行逻辑的编写，这样在联调接口的时候可以减少因为双方的字段名不符引起的小错误地发生，注意接口文档不是一定要开始就写到完美，在开发的过程中可能会因为需求的变动或者理解的偏差进行修改，但是也应当以精简准确为原则，不要带太多多余的参数。文档修改的时候要通知到相关人员，在项目迭代的时候字段的删减要格外注意。

### 封装 axios

在前端 Vue 项目中现在主要是采用 axios 进行 http 请求（在以前的 Vue 版本使用的是 vue-resource ，不过现在已经不再维护了），为了方便项目中的使用，在 utils 文件夹中的 request.js 文件中对于引入的 axios 进行了封装，配置了请求数据和返回数据的拦截器，以及基础的前缀和超时时间的配置。

### 接口的统一封装

根据接口的前缀，以上述的登录接口为例，在 api 文件夹中新建 user.js （命名是为了查找方便，并不是硬性规定），如下编写

```js
import request from '@/utils/request'

/**
 * @description: 登录
 * @param {Object} data
 * @param {String} data.userName 用户名
 * @param {String} data.password 密码
 * @return: Promise
 */
export function handleLoginApi (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
```

### 接口的调用

在 vue 文件中，先用 import 引入，然后通过链式调用即可实现调用，如下编写

```js
import { getSysUserListApi } from '@/api/user'

export default {
  methods: {
    getList () {
      // 调用接口是异步的请求，用一个变量来标志接口是否调用结束，
      // 便于页面中 loading 效果的显示与结束
      this.loading = true
      let params = {
        pageStart: this.page.start
      }
      // 此处填入的 params 就是 user.js 中的 data 所接收到的参数
      // 也就是后端接口收到的请求参
      getSysUserListApi(params).then(res => {
        this.loading = false
        // 判断请求响应的错误码是否为成功，是或者否分别执行相应的逻辑
        if (this.$codeConfig.ERROR_CODE.SUCCESS === res.errCode) {
          this.tableData = res.data.list
          this.page = res.data.page
        }
      }).catch(err => {
        // catch 处理请求异常的情况，请求异常已经在 request.js 文件中统一处理了，
        // 如果有特别的操作可以在此处单独处理，像改 loading 值的操作
        console.log(err)
        this.loading = false
      })
    }
  }
}
```

### 通过 dev-server 做请求的代理

前端的配置中，在 request.js 文件中设置了前端请求的接口的默认前缀都是 /api ，它的作用是什么呢，答案是便于请求的代理，请求的代理是开发工具为我们提供的解决跨域问题的方案，在 vue.config.js 的配置中

```js
proxy: {
  // 正则匹配，对于以 api 开头的请求进行下面的处理
  '/api': {
    // 代理指向的地址，一般就是后端服务的 ip 和端口号了，注意末尾要有 /
    target: 'http://192.168.9.120:8080/',
      // 是否跨域
      changeOrigin: true,
        pathRewrite: {
          // 地址重写，如果后端服务提供的接口有前缀，比如前缀是 project ，
          // 如果没有前缀就去掉 project
          '^/api': '/project'
        }
  }
}
```

### 常见问题

#### 响应状态码 500 

检查网络状态；后台服务状态；如果使用的是内网 ip ，是否同一局域网

#### 响应状态码 404

404 一般是调通了，但是服务端没有这个接口，所以检查接口路径是否正确，大小写。

### 结语

函数、文件、字段等的命名尽量见名知意





