# JavaScript 执行

宿主发起的任务是宏任务， JavaScript 引擎发起的任务是微观任务。JavaScript 引擎会等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环，所以在 Node 术语中，也会把这个部分称为事件循环。有了宏观任务和微观任务机制，我们就可以实现 JavaScript 引擎级和宿主级的任务了，例如： Promise 永远在队列尾部添加微观任务，setTimeout 等宿主 API 则会添加宏观任务。

## 异步

### Promise

Promise 是 JavaScript 语言提供的一种标准化的异步管理方式，它的总体思想是，需要进行io、等待或者其他异步操作呃函数，不返回真是结果，而返回一个"承诺"，函数的调用方可以在合适的时机，选择等待这个承诺兑现。

### async/await

Promise  的语法糖，async 函数是一种特殊的语法，特征是在 function 关键字之前加上 async 关键字，这样就定义了一个 async 函数，我们可以在其中使用 await 来等待一个 Promise

我们现在要实现一个红绿灯，把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色

```js
const trafficLight = document.getElementById('traffic-light')
function sleep (duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
function changeBgColor (color) {
  trafficLight.style.background = color
}
async function foo () {
  while (true) {
    changeBgColor('green')
    await sleep(3000)
    changeBgColor('yellow')
    await sleep(1000)
    changeBgColor('red')
    await sleep(2000)
  }
}
foo()
```

