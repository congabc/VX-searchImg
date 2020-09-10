<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommendData.length>0"
  >
    <!-- 推荐模块 -->
    <view class="recommend">
      <navigator 
      class="recommend_ltems" 
      v-for="item in recommendData" 
      :key="item.id"
      :url="`/pages/album/index?id=${item.targer}`">
        <image class="img" mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
      <!-- 月份 -->
    <view class="month">
      <view class="month_title">
        <view class="month_title_info" >
          <view class="months_info">
            <text> {{monthData.DD}} /</text>
            {{monthData.MM}} 月
          </view>
          <view class="month_title_text">{{monthData.title}}</view>
        </view>
      <vieew class="month_title_more">更多 ></vieew>
      </view>
      <view class="content">
        <view class="month_conment" v-for="(item,index) in monthData.items"
        :key="index">
        <go-detail :list="monthData.items" :index="index">
          <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
        </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="hot">
      <view class="hot_title">热门</view>
      <view class="hot_conment">
        <view class="hot_conment_item"
        v-for="(item,index) in hot" 
        :key="item.id">
        <go-detail :list="hot" :index="index">
          <image :src="item.thumb"></image>
        </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>

</template>

<script>
import moment from 'moment'
import goDetail from '@/components/goDetail'
export default {
  data() {
    return {
      recommendData:{},
      monthData:{},
      hot: [],
      params:{
        limit:30,
        order:"hot",
        skip:0,
      },
      hasMore:true
    };
  },

  components: {
    goDetail
  },
  mounted(){
    this.getList()
  },
  methods: {
     handleToLower(){
      if(this.hasMore){
       this.params.skip+=this.params.limit
        this.getList()
      }else{
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        })
      }
    },
    getList(){
      this.request({
        url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
        data:this.params
      })
      .then(res=>{
        if(res.data.res.vertical.length===0){
          hasMore=false
          uni.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          
          return
        }
        // if(this.recommendData == {}){
          this.recommendData=res.data.res.homepage[1].items
          this.monthData=res.data.res.homepage[2]
          this.monthData.MM=moment(this.monthData.stime).format('MM')
          this.monthData.DD=moment(this.monthData.stime).format('DD')
        // }
          this.hot = [...this.hot, ...res.data.res.vertical];
        console.log(this.recommendData.length)

      })
    },
   
  },
};
</script>

<style scoped lang="scss">
.recommend_view{
  height: calc(100vh - 36px);
}
// 推荐
.recommend{
  display: flex;
  flex-wrap: wrap;//换行

  .recommend_ltems{
    width: 49%;
    border: 3rpx solid #fff;
    .img{
      width: 100%;
    }
  }
}
//月份
.month {
    width: 100%;
  .month_title {
    height: 60rpx;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    .month_title_info {
      display: flex;
      font-size: 30rpx;
      color: $color;
      text {
      font-size: 36rpx;

      }

      .month_title_text {
        line-height: 60rpx;
        margin-left: 20rpx;
        font-size: 26rpx;
        color: #000;
      }
      
    }
    .month_title_more{
        color: $color;
      }
  }
  .content{
          display: flex;
      flex-wrap: wrap;
    .month_conment {
      width: 33%;
      border-right: 1rpx solid #fff;
      image{
        width: 100%;
      }
    }
  }
}
// 热点
.hot {
  
  .hot_title {
    margin: 20rpx 0 10rpx;
    border-left: 5px solid $color;
    color: $color;
    padding-left: 20rpx;
    font-size: 30rpx;
  }

  .hot_conment {
         display: flex;
      flex-wrap: wrap;
    .hot_conment_item{
            width: 33%;
      border-right: 1rpx solid #fff;
      image{
        width: 100%;
      }
    }
  }
}
</style>