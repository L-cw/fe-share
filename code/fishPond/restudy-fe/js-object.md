# JavaScript 对象分类

- 宿主对象，由宿主环境提供的对象，行为由宿主环境决定
- 内置对象，由JavaScript语言提供的对象
  - 固有对象，由标准规定，随JavaScript运行时创建而自动创建的对象实例
  - 原生对象，可以由用户通过 Array、RegExp等内置构造器或者特殊语法创建的对象
  - 普通对象，由 {} 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承

## 宿主对象

例如 Window 对象，来自浏览器环境，window 上的属性一部分来自 JavaScript 语言，一部分来自浏览器环境。 JavaScript 标准中规定了全局对象属性， W3C 的各种标准中规定过了 window 对象的其他属性。宿主对象也可以分为固有的和用户创建的两种，比如 document.createElement 就可以创建一些 DOM 对象。宿主也会提供一些构造器，比如我们可以使用 new Image 来创建 img 元素。

## 内置对象  —— 固有对象

固有对象在 JavaScript 代码执行前就被创建出来了，他们通常扮演着类似基础库的角色

## 内置对象 —— 原生对象

通过语言内置的构造器创建的对象
