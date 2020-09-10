<template>
  <view>
    <!-- 轮播图 -->
    <view class="album-swiper">
      <swiper 
      class="album-slideShow"
      indicator-dots
      autoplay
      circular>
        <swiper-item class="slideShow-item"
        v-for="item in banner"
        :key="item.id">
          <image  :src="item.new_thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表详情 -->
    <view class="content">
      <navigator 
      class="content-item"
      v-for="item in album"
      :key="item.id"
      :url="`/pages/album/index?id=${item.id}`">
        <view class="content-item-img">
          <image :src="item.cover"></image>
        </view>
        <view class="content-item-info">
          <view class="item-info-text">
            <view class="title">{{item.name}}</view>
            <text>{{item.desc}}</text>
          </view>
          <view class="album_btn">
            <view class="album_attention">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      params:{
        limit: 30,
        order: "new",
        skip: 0
      },
      banner:[

      ],
      album:[]
    }
  },

  components: {},
  mounted(){
    // console.log(123);
    this.getList()
  },
  methods: {
    getList(){
      this.request({
        url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
        data:this.params
      })
      .then(res=>{
        console.log(res);
        this.banner=res.data.res.banner
        this.album=res.data.res.album
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 轮播
.album-swiper {
  .album-slideShow {
    
      height: 331rpx;
      width: 750rpx;
    .slideShow-item {
      image {
        height: 100%;
        width: 100%;
      }
    }
  }
}
// 列表详情
.content {
  .content-item {
    padding: 20rpx 10rpx 10rpx ;
    display: flex;
    border-bottom: 1px solid #ccc;
    .content-item-img {
      flex:1;
      image {
      height: 200rpx;
      width: 200rpx;
      }
    }

    .content-item-info {
      margin-left: 10rpx;
      flex:2;
      display: flex;
      flex-direction:column;
      overflow: hidden;
      justify-content: space-between;
      .item-info-text {
        display: flex;
        flex-direction:column;
        .title{
        font-size: 32rpx;
        color: #000;
        font-weight: 600;
        }
        text {
          font-size: 28rpx;
          color: #555;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        }
      }

      .album_btn {
        display: flex;
        justify-content: flex-end;
        .album_attention {
          color: $color;
          border: 1rpx solid $color;
        padding: 10rpx 20rpx 10rpx 10rpx;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>