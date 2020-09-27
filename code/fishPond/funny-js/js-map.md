# `['1', '2', '3'].map(parseInt)` what & why ?

在 [木易杨前端进阶](https://muyiy.vip/question/js/2.html) 看到的一道题，比较有意思，做个记录

## map 方法定义

map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```

## 展开
```js
['1', '2', '3'].map(parseInt)

// 对于每个元素执行一次callback函数，并向 callback 函数中自动传入三个参数：
parseInt(currentValue, index, array)
```

## 变形题
```js
let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))
```

展开

```js
['1.1', '2', '0.3'].map(parse)

unary = (fn) => {
  return (val) => {
    fn(val)
  }
}
// 对于每个元素执行：
parse(currentValue, index, array)
unary(parseInt)(currentValue, index, array)
((val) => {
  parseInt(val)
})(currentValue, index, array)
```