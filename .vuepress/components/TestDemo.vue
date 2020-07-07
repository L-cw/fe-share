<template>
	<div class="text">{{text}}
    <a href="javascript:;">innerLink</a>
  </div>
</template>
<script>
export default {
	name: 'name',
	data () {
		return {
      text: '测试自定义组件在Markdown中的使用'
    }
	},
	components: {},
	computed: {},
	created () {},
	mounted () {
    console.log('mounted!!')
  },
	methods: {},
	watch: {},
	beforeDestroy () {},
}
</script>
<style lang="less" scoped>
 @import './base.less';
 .text{
   color: @color-default;
   font-size: 20px;
   &>a{
     color: #0000FF;
     text-decoration: underline;
   }
 }
</style>
