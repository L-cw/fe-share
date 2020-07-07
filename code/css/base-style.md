## 基础样式

base.less/css 这个文件通常放置项目最基础或整个项目中通用的样式规则，无论用的是 less 还是 css 还是其他的什么，同理。

```less
.clearfix::after {
  content: "";
  display: block;
  height:0;
  clear: both;
}

.clearfix {
  *zoom: 1;
}

a{
  text-decoration: none;
  color: #666;
  &:hover{
      color: #00d080;
  }
}
.fl {
  float: left;
}

.fr {
  float: right;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

```

