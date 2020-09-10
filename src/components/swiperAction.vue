<template>
<!-- 图片页面详情滑动切图 -->
 <view class="touch"
 @touchstart="touchStart"
 @touchend="touchEnd">
     <slot></slot>
 </view>
</template>

<script>
export default {
  data () {
    return {
        touchX:0,
        touchY:0,
        slide:''
    }
  },

  components: {},

  methods: {
    //   滑动起始位置
      touchStart(e){
          this.touchX=e.changedTouches[0].clientX
          this.touchY=e.changedTouches[0].clientY
      },
    //   滑动终止位置
      touchEnd(e){
        const touchEndX =e.changedTouches[0].clientX
        const touchEndY =e.changedTouches[0].clientY
        let slide=''
        if(Math.abs(touchEndX-this.touchX)>10 &&Math.abs(touchEndY-this.touchY)<10 ){
            if(touchEndX-this.touchX>0){
                slide="右滑"
            }else if(touchEndX-this.touchX<0){
                slide="左滑"
            }
        }else{
            return
        }
        this.$emit("swiperAction",{slide})       
      }
  }
}
</script>

<style scoped>
</style>