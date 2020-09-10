<template>
  <view class="author">
    <view class="author_mess">
      <view class="author_avatar">
        <image mode="widthFix" :src="imgItem.user.avatar"></image>
      </view>
      <view class="author_info">
        <view class="author_name">{{imgItem.user.name}}</view>
        <view class="author_time">{{imgItem.longTime}}</view>
      </view>

    </view>
    <!-- 大图 -->
    <swiper-action @swiperAction="slideImg">
    <view class="author_img" >
        <image mode="widthFix" :src="imgItem.thumb"></image>
    </view>
    </swiper-action>
    <!-- 点赞模块 -->
    <view class="author_caozuo">
      <view class="author_caozuo-dianzan">
        <text class="iconfont icon-close">{{imgItem.rank}}</text>
      </view>
      <view class="author_caozuo-shoucang">
        <text class="iconfont icon-mine">收藏</text>
      </view>
    </view>
    <!-- 专辑 -->
    <view class="album_wrap">
      <!-- 标题 -->
      <view class="album_title">
        <text>相关</text>
      </view>
      <!-- 内容 -->
      <view class="album_content">
        <view class="album_content_img">
          <image mode="aspectFill"
          src="http://img5.adesk.com/5e4e7d10e7bce7393fd1755f?imageView2/3/h/240"></image>
        </view>
        <view class="album_content_text">
          <view class="biaoti">专辑</view>
          <view class="content_text"> 小熊猫</view>
        </view>
      </view>
      <view class="icon">></view>
    </view>
    <!-- 最火评论 -->
    <view class="comment hot">
      <view class="comment_title">
        <text >❤</text>
        <text class="comment_text">最热评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item">
          <view class="comment_item_user">
            <view class="comment_item_info">
              <image 
              class="comment_item_img"
              mode="widthFix" 
              src="http://thirdqq.qlogo.cn/qqapp/100428621/974D40E4966467E286AB26C27D5CA818/100"></image>
            </view>
            <view class="comment_item_name">
              <view class="comment_item_avatar">ζั͡ޓއއއ๓华藜</view>
              <view class="comment_item_time">1584772169</view>
            </view>
            <view class="comment_item_xunzhang">123</view>
          </view>
          <view class="comment_miaoshu">
            <text>悲伤逆流成河，顾森湘</text>
            <view class="comment_miaoshu_icon">
            <text class="iconfont icon-close">4</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 -->
    <view class="comment new">
      <view class="comment_title">
        <text >❤</text>
        <text class="comment_text">最新评论</text>
      </view>
      <view class="comment_list">
        <view class="comment_item"
        v-for="item in comment"
        :key="item.id">
          <view class="comment_item_user">
            <view class="comment_item_info">
              <image 
              class="comment_item_img"
              mode="widthFix" 
              :src="item.user.avatar"></image>
            </view>
            <view class="comment_item_name">
              <view class="comment_item_avatar">{{item.user.name}}</view>
              <view class="comment_item_time">{{item.chTime}}</view>
            </view>
            <view class="comment_item_xunzhang">123</view>
          </view>
          <view class="comment_miaoshu">
            <text>{{item.content}}</text>
            <view class="comment_miaoshu_icon">
              <text class="iconfont icon-close">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 下载图片 -->
    <view class="download">
      <view class="download_wrap">
        <view class="download_btn" @click="handleDownload">下载图片</view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import swiperAction from '@/components/swiperAction'
moment.locale("zh-cn")
export default {
  data () {
    return {
      imgList:[],
      imgIndex:0,
      imgItem:{},
      comment:[]
    }
  },

  components: {swiperAction},
onLoad(){
    console.log(getApp().globalData)
    this.imgIndex= getApp().globalData.imgIndex
    this.imgList= getApp().globalData.imgList
    this.getList()
},
mounted(){

},
  methods: {
    getList(){
    this.imgItem= this.imgList[this.imgIndex]
    // console.log(moment().utc().format())
    // console.log(moment(this.imgList.atime*1000).fromNow())
    // console.log(this.imgList.atime)
    // console.log(moment().utc())
    this.imgItem.longTime=moment(this.imgList.atime*1000).fromNow()
    this.getComments(this.imgItem.id)
    },
    getComments(id){
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      .then(res=>{
        // console.log(res.data)
        res.data.res.comment.forEach(
          v => (v.chTime=moment(v.atime*1000).fromNow())
          
        );
        this.comment=res.data.res.comment
        console.log(res.data.res)
      })
      // console.log(this.comment)
    },
    slideImg(a){
      // console.log(a);

      if(a.slide==='左滑'){
        this.imgIndex++

        this.getList()
      }else if(a.slide==='右滑'){
        this.imgIndex--
        this.getList()
      }

    },
    // 下载
    async handleDownload(){
      await uni.showLoading({
        title:"下载中"
      })
      const src = await uni.downloadFile({
        url:this.imgItem.img
      }) 
      console.log(src);
      const src1 = await uni.saveImageToPhotosAlbum({
        filePath:src[1].tempFilePath
      })
       uni.hideLoading()
      if(src1[1]){
         await uni.showToast({
         title:"下载成功"
       })
       return
       }
         await uni.showToast({
         title:"下载失败",
         icon:"none"
       })
       
      
    }
  }
}
</script>

<style scoped lang="scss">
.author {
  .author_mess {
    display: flex;
    padding: 40rpx 20rpx;
    .author_avatar {
      width: 88rpx;
      padding: 0rpx 20rpx;
      image {
        width: 100%;
        border-radius: 50%;
      }
    }

    .author_info {
      .author_name {
        font-size: 32rpx;
        color: #000;
        font-weight: 600;
      }

      .author_time {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
  .author_img {
    width: 750rpx;
    image{
      width: 100%;
    }
  }
  // 点赞
  .author_caozuo {
    display: flex;
    height: 36rpx;
    padding: 20rpx;
    border-bottom: 1px solid #ccc;
    .author_caozuo-dianzan {
      flex: 1;
        text-align: center;
        line-height: 36rpx;
      .icon-close {
      }
    }

    .author_caozuo-shoucang {
      flex: 1;
        text-align: center;
        line-height: 36rpx;
      .icon-mine {
      }
    }
  }
  // 专辑
  .album_wrap {
    position: relative;
    padding: 30rpx 20rpx;
    border-bottom: 3px solid #eee;
  .album_title {
    padding-bottom: 10rpx;
    text {
      font-size: 32rpx;
    }
  }

  .album_content {
    display: flex;
    .album_content_img {
      width: 200rpx;
      height: 200rpx;
      
      image {
        width: 100%;
        height: 100%;
      }
    }

    .album_content_text {
      padding-left: 20rpx;
      .biaoti {
        margin-bottom: 10rpx;
        text-align: center;
        background-color: $color;
        color: #fff;
        font-size: 28rpx;
      }
      .content_text {
        font-size: 28rpx;
      }
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    right: 30rpx;
    font-size: 40rpx;
    transform: translateY(-50%);
    color: #ccc;
  }
}
  // 热门
  .comment {
    padding-left: 10rpx;
    .comment_title {

        text {
          color: red;
        }

      .comment_text {
        padding-left: 10rpx;
        font-size: 30rpx;
        color: #000;
        }
      }

    .comment_list {
      margin: 20rpx 10rpx;
      .comment_item {
        border-bottom: 10rpx solid #eee;
        padding: 20rpx 0;
        .comment_item_user {
          display: flex;
          .comment_item_info {
            width: 15%;
            .comment_item_img {
              width: 100%;
              }
            }

          .comment_item_name {
            padding-left: 20rpx;
            flex: 1;
            .comment_item_avatar {
              font-size: 30rpx;
              color: #777;
              }

            .comment_item_time {
              font-size: 24rpx;
              color: #ccc;
              }
            }

          .comment_item_xunzhang {
            text-align: right;
            }
        }

        .comment_miaoshu {
          padding-left: 15%;
          display: flex;
            text {
              padding-left: 20rpx;
              flex: 1;
              font-size: 30rpx;
              color: #000;
            }
          .comment_miaoshu_icon{
            .icon-close {
              font-size: 24rpx;
            text-align: right;
            }
          }
          
        }
      }
    }
  }
  // 下载
  .download{
    .download_wrap{
      height: 100rpx;
      width: 750rpx;
      position: relative;
      .download_btn{
        width: 90%;
        height: 90rpx;
        line-height: 60rpx;
        background-color: $color;
        color: #fff;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10rpx;
      }
    }
  }
}
</style>