## 滚动条样式

这里只考虑 Chrome 浏览器可用

```less
pre::-webkit-scrollbar, code::-webkit-scrollbar {
  width: 4px;     
  height: 4px;
}
pre::-webkit-scrollbar-thumb, code::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
pre::-webkit-scrollbar-track code::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
pre::-webkit-input-placeholder code::-webkit-input-placeholder {
  font-size: 12px;
  color: #C9C9C9;
}
```

将 `pre` 替换为要设置滚动条的元素即可