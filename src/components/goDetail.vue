<template>
<!-- 图片点击事件、跳转 -->
<view @click="handleClick">
  <slot></slot>
</view>
</template>

<script>
export default {
  // 父子组件传参
  props:{
    list:Array,
    index:Number
  },
  data () {
    return {
    }
  },

  components: {},

  methods: {
    // 图片跳转
    handleClick(){
      getApp().globalData.imgList=this.list;
      getApp().globalData.imgIndex=this.index;
      uni.navigateTo({
        url:"/pages/imgDetail/index"
      })
    }
  }
}
</script>

<style scoped>
</style>