<template>
 <view class="cetegory">
   <navigator class="cetegory_item"
   v-for="item in imgList"
   :key="item.id"
   :url="`/pages/imgCategory/index?id=${item.id}`">
     <image mode="aspectFill" :src="item.cover">
     </image>
     <view class="cetegory_text_wrap">
      {{item.name}}
     </view>
   </navigator>
 </view>
</template>

<script>
export default {
  data () {
    return {
      imgList:[]
    }
  },

  components: {},
  mounted(){
    this.getList()
    
  },
  methods: {
    getList(){
      this.request({
        url:"http://157.122.54.189:9088/image/v1/vertical/category"
      })
      .then(res=>{
        console.log(res);
        this.imgList=res.data.res.category
        console.log(this.imgList)
      })
    }
    
  }
  
}
</script>

<style scoped lang="scss">
.cetegory {
  display: flex;
  flex-wrap: wrap;
  .cetegory_item {
    box-sizing: border-box;
    width: 33.3%;
    border-right: 5px solid #fff;
    position: relative;
    image {
      width: 100%;
      height: 240rpx;
    }

    .cetegory_text_wrap {
      position: absolute;
      bottom: 10rpx;
      right: 0;
      left: 0;
      height: 50rpx;
      padding-left: 10rpx;
      background-image: linear-gradient(to right top,rgba(0,0,0,.5),rgba(0,0,0,0));
      color: #fff;
      font-size: 40rpx;
      line-height: 50rpx;
    }
  }
}
</style>