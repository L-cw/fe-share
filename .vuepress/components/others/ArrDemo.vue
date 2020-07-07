<template>
	<div class="demo-cont">
    <div class="arr-cont">{{ JSON.stringify(testArr) }}</div>
    <div class="btn-cont">
      <a href="javascript:;" @click="sortHandle">快速排序</a>
      <a href="javascript:;" @click="uniqueHandle">去重</a>
      <a href="javascript:;">获取最大值</a>
      <a href="javascript:;">获取最小值</a>
      <a href="javascript:;" @click="resetArr">重置</a>
    </div>
  </div>
</template>
<script>
function quickSort (arr) {
  if (arr.length <= 1) {
    return arr
  }
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
// 先排序，再判断相邻两个元素是否重复
function unique1 (arr) {
  let result = []
  arr = arr.sort()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      result.push(arr[i])
    }
  }
  return result
}
function unique2 (arr) {
  let result = []
  for (let i = 1; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}
function unique3 (arr) {
  let result = []
  let obj = {}
  for (let i = 1; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true
      result.push(arr[i])
    }
  }
  return result
}
export default {
	name: 'ArrDemo',
	data () {
		return {
      testArr: [1, 33, 55, 21, 1, 43, 69, 40, 88, 55, 55]
    }
	},
	components: {},
	computed: {},
	created () {},
	mounted () {},
	methods: {
    sortHandle () {
      this.testArr = quickSort(this.testArr)
    },
    uniqueHandle () {
      this.testArr = unique3(this.testArr)
    },
    resetArr () {
      this.testArr = [1, 33, 55, 21, 1, 43, 69, 40, 88, 55, 55]
    }
  },
	watch: {},
	beforeDestroy () {},
}
</script>
<style lang="less" scoped>
  .demo-cont{
    .btn-cont{
      padding: 10px 0;
      &>a{
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
</style>
