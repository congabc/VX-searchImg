<template>
  <view class="videoPlay">
      <image :src="videoObj.img"></image>
      <!-- 工具栏 -->
      <view class="videoPlay_tool">
          <view class="iconfont icon-app" @click="shengyin=!shengyin"></view>
          <view class="iconfont icon-search">
              <button  open-type="share"></button>
          </view>
      </view>
      <!-- 视频 -->
      <view class="videoPlay_play">
          <video :src="videoObj.video" :muted="shengyin" objectFit="fill"></video>
      </view>
      <!-- 下载 -->
      <view class="videoPlay_download">下载视频</view>
      

  </view>
</template>

<script>
export default {
  data(){
      return{
          videoObj:{},
          shengyin:false
      }
  },
    onLoad(){
        // console.log(getApp().globalData);
        this.videoObj=getApp().globalData.video
    },
}
</script>

<style scoped lang="scss">
.icon-search{
    position: relative;
    button{
        position: absolute;
        top:0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}
.videoPlay {
    position: relative;
  image {
      position: absolute;
      z-index: -1;
      height: 100vh;
      width: 100vw;
      filter: blur(20px);
  }

  .videoPlay_tool {
      height: 80rpx;
      display: flex;
      justify-content: flex-end;
    .iconfont {
        width: 80rpx;
        border-radius: 40rpx;
        color: #fff;
        line-height: 80rpx;
        text-align: center;
        background-color: rgba(0,0,0,0.4);
        margin-right: 20rpx;

    }
  }

  .videoPlay_play {
    //   display: flex;
    //   justify-content: center;
    video {
        display: block;
        width: 360rpx;
        height: 600rpx;
        margin: 0 auto; 
    }
  }

  .videoPlay_download {
      text-align: center;
      display: block;
      margin: 30rpx auto;
      width: 360rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 30rpx;
      background-color: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 30rpx;
  }
}
</style>