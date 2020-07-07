## 小程序中的 wxs 工具类

由于 wxs 和 js 是不同的语言，所以在项目中使用的 wxs 总结在此处

```js
var commaNumber = function (numStr) {
  if (numStr) {
    var regNum = getRegExp('\d+');
    var regComma = getRegExp('(\d)(?=(\d{3})+$)', 'g');
    numStr = numStr.replace(regNum, function(s){
      return s.replace(regComma, '$1,');
    })
    return numStr
  }
  return numStr
}

var formatTimeStapm2Date = function (timeStamp) {
  var timeStamp = parseInt(timeStamp, 10);
  var date = getDate(timeStamp);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return month + '月' + day + '日';
}

var parseStrToObj = function (str) {
  return JSON.parse(str)
}

module.exports = {
  commaNumber: commaNumber,
  formatTimeStapm2Date: formatTimeStapm2Date,
  parseStrToObj: parseStrToObj
}
```