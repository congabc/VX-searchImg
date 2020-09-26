<template>
  <scroll-view @scrolltolower="scrollDownToLower" scroll-y enable-flex class="video_img">
      <view 
      class="video_img_item"
      v-for="item in videoWp"
      :key="item.id"
      @click="handleGoVideo(item)">
          <image mode="widthFix" :src="item.img"></image>
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
        videoWp:[],
        params:[],
        url:"",
        isData:true,
    }
  },

  components: {},
    mounted(){
        this.params=this.urlObj.params
        this.getList()
    },
  methods: {
      getList(){
          this.request({
              url:this.urlObj.url,
              data:this.params
          })
          .then(res=>{
              if(res.data.res.videowp.length===0){
                  this.isData=false
                  uni.showToast({
                      title:"没有数据了1"
                  })
                  return
              }
              this.videoWp=[...this.videoWp,...res.data.res.videowp]|| []
          })
      },
      scrollDownToLower(){
          if(this.isData){
            this.params.skip+=this.params.limit||[]
            this.getList()
          }else{
              uni.showToast({
                  title:"没有数据了"
              })
          }
      },
      handleGoVideo(item){
          getApp().globalData.video=item;
          uni.navigateTo({
              url:"/pages/videoPlay/index"
          })
      }
  },
  watch :{
      urlObj(){
          this.videoWp=[],
          this.isData=true,
          this.params.skip=0,
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
      width: 33.33%;
    box-sizing: border-box;
      border-right: 3px solid #fff;
    image {
        width: 100%;
    }
  }
}
</style>