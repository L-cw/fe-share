# 功能性工具类

本文主要为一些提供功能性的工具

## 节流函数

```js
/**
 * 节流函数
 * 作用： 函数被触发的频率较高，按时间段来忽略掉一些调用
 * @param {Function} fn 被执行的函数
 * @param {Number} interval 延迟执行的时间(毫秒)
 * @author *chenlang
 */
export function throttle(fn, interval) {
  // 保存需要被延迟函数的引用
  let _self = fn,
  // 定时器
  timer,
  // 是否是第一次调用
  firstTime = true; 

  return function (...args) {
    let _me = this;
    //  第一次调用
    if (firstTime) {
      _self.apply(_me, args);
      return (firstTime = false);
    }

    // 定时器还在，说明前一次延迟执行没完成
    if (timer) {
      return false;
    }

    timer = setTimeout(function () {
      clearInterval(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
}
```

## WebSocket

```js
/*
 * 创建并初始化 WebSocket 实例
 * 
 * @example:
 * 页面中使用：1 创建 WebSocket 实例； 2 自定义处理事件 (非必须)； 3 页面销毁：断开连接；
 * 
 * 1 创建 WebSocket 实例；
 * import createWebSocket from '../socket.js';
 * this.ws = createWebSocket({
 *  url: 'test',
 *  onopen: this.onopen,
 *  onerror: this.onerror,
 *  onmessage: this.onmessage,
 *  onclose: this.onclose
 *})
 *
 * 2 自定义处理事件 (非必须)
 * onmessage(evt) {
 *    if (evt.data > 3) {
 *      this.ws.close();
 *    }
 *  }
 *  
 * 3 页面销毁：断开连接；
 * beforeDestroy() {
 *  this.ws.close();
 * }
 */

const serviceAgen = 'ws://localhost:9998/';

/**
 * 初始化 WebSocket Event
 * @param {Object} ws websocket 实例
 * @param {Object} events 自定义事件集合
 */
function initEventHandle(ws, events) {
  // 连接成功
  ws.onopen = (evt) => {
    events.onopen()
  };

  // 连接失败
  ws.onerror = (err) => {
    console.log('浏览器连接失败：', err);
    events.onerror(err)
  };

  // 收到服务器数据后的回调
  ws.onmessage = (evt) => {
    console.log('浏览器收到数据：', evt.data);
    events.onmessage(evt)
  };

  // 连接关闭回调
  ws.onclose = () => {
    console.log('浏览器关闭连接');
  };
}

/**
 * 创建 WebSocket 实例
 * @param {Object} 
 * @return {Object} WebSocket 实例
 */
export default function createWebSocket({
  url = '',
  onopen = () => {},
  onerror = () => {},
  onmessage = () => {},
  onclose = () => {}
}) {
  let ws = null;

  if ('WebSocket' in window) {
    if (!url) {
      throw new Error('websocket连接的URL不能为空')
    }

    ws = new WebSocket(`${serviceAgen}${url}`);
    
    initEventHandle(ws, { onopen, onerror, onmessage, onclose });

    return ws;
  } else {
    alert('您的浏览器不支持websocket')
  }
}
```

## 字符串校验

```js
export function checkStrTool(str, type) {
  switch (type) {
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date': //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
        /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': //数字
      return /^[0-9]*$/.test(str);
    case 'positiveNumber': //正整数
      return /^[1-9]\d*$/.test(str);
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese': //中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower': //小写
      return /^[a-z]+$/.test(str);
    case 'upper': //大写
      return /^[A-Z]+$/.test(str);
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    case 'blockNum': //区块数
      return /^\+?[1-9][0-9]/.test(str)
    case 'privKey': //私钥
      return /^privb.{51}$/.test(str)
    case 'puubKey': //公钥
      return /^.{76}$/.test(str)
    case 'address': //地址
      return /^adx.{34}$/.test(str)
    case 'ethAddr': //eth地址
      return /^.{42}$/.test(str)
    case 'privEncryptId': //隐私加密ID
      return /^[0-9a-f]{66}$/.test(str)
    case 'privEncryptKey': //隐私加密ID
      return /^[0-9a-f]{64}$/.test(str)
    default:
      return true;
  }
}
```

## 通过节点获取图片的 base64

```js
/**
 * 获取图片节点单独Base64
 * @param img html的img标签 dom节点对象
 * @param ext 图片格式
 * @returns {string}
 */
export function getImageBase64(img, ext) {
  var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
  var dataURL = canvas.toDataURL(ext);  //返回的是一串Base64编码的URL并指定格式
  canvas = null; //释放
  return dataURL;
}
```

## 通过 url 获取图片的 base64

```js
/**
 * 根据图片Url获取图片的base64编码
 * @param url 图片路径
 * @param ext 图片格式
 * @param callback 结果回调
 */
export function getUrlBase64(url, ext, callback) {
  var canvas = document.createElement("canvas");   //创建canvas DOM元素
  var ctx = canvas.getContext("2d");
  var img = new Image;
  img.crossOrigin = 'Anonymous';
  img.src = url;
  img.onload = function () {
    canvas.height = img.height; //指定画板的高度,自定义
    canvas.width = img.width; //指定画板的宽度，自定义
    ctx.drawImage(img, 0, 0); //参数可自定义
    var dataURL = canvas.toDataURL(ext);
    callback.call(this, dataURL); //回调函数获取Base64编码
    canvas = null;
  };
}
```