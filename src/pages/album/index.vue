<template>
<!-- 专辑详情 -->
<view class="album">
  <view class="album_img">
    <image mode="widthFix" class="img" :src="album.cover"></image>
    <view class="album_img_title">{{album.name}}</view>
    <view class="album_img_guanzhu">关注专辑</view>
  </view>
  <view class="album_info">
    <view class="album_info_title">
      <image :src="album.user.avatar"></image>
      <view class="title">{{album.user.name}}</view>
    </view>
    <view class="album_info_content">
      <text>{{album.desc}}</text>
    </view>
  </view>
  <!-- 列表详情 -->
  <view class="album-list">
    <view 
    class="album-item"
    v-for="(item,index) in wallpaper"
    :key="item.id">
    <go-detail :list="wallpaper" :index="index">
      <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
    </go-detail>
    </view>
  </view>
</view>
</template>

<script>
import goDetail from '@/components/goDetail'
export default {
  components:{goDetail},
  data () {
    return {
      id:0,
      params:{
        limit: 30,
        order: "new",
        skip: 0,
        first:1
      },
      album:{},
      wallpaper:[],
      first:true
    }
  },
  onLoad(options){
    this.id=options.id

    this.getList()
  },
  methods: {
    getList(){
      this.request({
        url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data:this.params
      })
      .then(res=>{
        if(this.first){
          this.album=res.data.res.album

        }
        console.log(res);
        if(res.data.res.wallpaper.length===0){
          uni.showToast({
            title:"没有更多数据了",
            icon:"none"
          })
        }
        this.wallpaper= [...this.wallpaper,...res.data.res.wallpaper]
      })
    }
  },
  onReachBottom(){
    this.first=false
        this.first=0
    this.params.skip += this.params.limit;
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.album {
  .album_img {
    width: 750rpx;
    position: relative;
    .img {
      width: 100%;
    }

    .album_img_title {
      position: absolute;
      bottom: 30rpx;
      left: 20rpx;
      color: #fff;
      height: 36rpx;
      line-height: 36rpx;
      font-size: 36rpx;
    }

    .album_img_guanzhu {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      color: #fff;
      background-color: $color;
      font-size: 24rpx;
      padding: 10rpx 16rpx;
    }
  }

  .album_info {
    margin: 20rpx 15rpx;
    .album_info_title {
      display: flex;
      
      image {
        width: 50rpx;
        height: 50rpx;
      }

      .title {
        padding: 0 10rpx;
        font-size: 30rpx;
        font-weight:600
      }
    }

    .album_info_content {
      font-size: 26rpx;

    }
  }
  .album-list {
    flex-wrap:wrap;
    display: flex;
  .album-item {
    box-sizing: border-box;
    width: 50%;
      height: 300rpx;
      border: 3px solid #fff;
    image {
      width: 100%;
      height: 300rpx;
    }
  }
}
}
</style>