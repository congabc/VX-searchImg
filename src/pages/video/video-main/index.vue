<template>
  <scroll-view scroll-y enable-flex class="video_img">
      <view 
      class="video_img_item"
      v-for="item in videoWp"
      :key="item.id">
          <image mode="aspectFill" :src="item.img"></image>
          <view class="text">{{item.name}}</view>
      </view>
  </scroll-view>
</template>

<script>
export default {
    props:{
        urlObj:Object
    },
  data () {
    return {
        videoWp:[]
    }
  },

  components: {},
    mounted(){
        console.log(this.urlObj);
        this.getList()
    },
  methods: {
      getList(){
          this.request({
              url:this.urlObj.url,
              data:this.urlObj.params
          })
          .then(res=>{
              console.log(res);
              this.videoWp=res.data.res.videowp 
                // console.log(this.videoWp);
          })
      }
  },
  watch :{
      urlObj(){
          this.videoWp=[],
          this.getList()
      }
  }
}
</script>

<style scoped lang="scss">
.video_img {
    margin-top: 10rpx;
    display: flex;
    flex-wrap: wrap;
    height: calc( 100vh - 36px);
  .video_img_item {
      width: 50%;
      height: 300rpx;
    box-sizing: border-box;
      border: 3px solid #fff;
      position: relative;
    image {
        width: 100%;
        height: 300rpx;
    }
    .text{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #fff;
        background:linear-gradient(to right top, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
    }
  }
}
</style>