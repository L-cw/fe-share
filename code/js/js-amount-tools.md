# 金额及数量处理工具

链上转账一般用数量而不是金额

## 检测精度数字

```js
/**
 * @description: 检查带精度的数量
 * @param {String} val 数量
 * @param {String} decimal 数量的精度
 * @return: true 或 false
 */
export function checkAmountTool (val, decimal = 0) {
  switch (decimal) {
    case 0:
      return /^([1-9][0-9]*)$/.test(val)
    case 1:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,1}|[1-9][0-9]*\.\d{1,1})))$/.test(val)
    case 2:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(val)
    case 3:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,3}|[1-9][0-9]*\.\d{1,3})))$/.test(val)
    case 4:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/.test(val)
    case 5:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,5}|[1-9][0-9]*\.\d{1,5})))$/.test(val)
    case 6:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,6}|[1-9][0-9]*\.\d{1,6})))$/.test(val)
    case 7:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,7}|[1-9][0-9]*\.\d{1,7})))$/.test(val)
    case 8:
      return /^(([1-9][0-9]*)|(([0]\.\d{1,8}|[1-9][0-9]*\.\d{1,8})))$/.test(val)
  }
}
```