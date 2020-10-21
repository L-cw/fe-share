# 开发中遇到的 Element 相关问题，记录：
## 问题： 单独引入 Message 组件，项目开始会自动弹一次 message

### 解决办法： 

```js
import { Message } from 'element-ui'
Vue.component(Message)
Vue.prototype.$message = Message
```

## ElementUI el-table 在flex下的宽度自适应问题

**问题描述：**

在flex容器下面的一个`flex:1`的子容器里面写了个`el-table`用来展示列表数据，在做宽度自适应测试的时候发现该组件的宽度只会增加不会缩小。

**问题原因：**

通过控制台发现组件生成的`table`的宽度是动态计算的，翻查源码，发现以下代码段

```js
// table.vue
if (this.fit) {
  addResizeListener(this.$el, this.resizeListener);
}

// resize-event.js
export const addResizeListener = function(element, fn) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};
```

也就是说，组件的`resize`事件是绑定在`this.$el`上了，这应该就是的原因所在了。flex容器下的`width:100%`会一直向上继承，直到flex容器下第一级子元素，但是当某个子元素的宽度出现固定值并且大于flex伸展的宽度的时候，那么容器就不会收缩，自然也就触发不了`resize`事件了。

### 解决办法：

可以将设置了`flex`属性的容器设置`position:relative`，然后在子元素加多一层div包裹内容，设置`position:absolute; width:100%;`继承父级宽度，那么内容也会继承该div的宽度了。

## 参考链接

[ElementUI el-table 在flex下的宽度自适应问题](https://blog.csdn.net/qq_19694913/article/details/81144314)

