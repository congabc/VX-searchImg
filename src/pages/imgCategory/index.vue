<template>
    <view class="cate">
       <view class="cate_title">
           <view class="cate_title_inner">
                <uni-segmented-control 
                :current="current" 
                :values="items.map(v=>v.title)" 
                @clickItem="onClickItem" 
                style-type="text"
                active-color="#d4237a"
                style="font-size:40rpx"></uni-segmented-control>
            </view>
        </view>
        <scroll-view @scrolltolower="handleScrolltolower" enable-flex scroll-y  class="cate_content">
            <view
            class="cate_content_item"
            v-for="item in vertical"
            :key="item.id">   
                <image mode="widthFix" :src="item.thumb"></image>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data () {
    return {
        items: [
            { title: "最新" ,order:"new"},
            { title: "热门" ,order:"hot"},
      ],
      current: 0,
        id:0,
        hasMore:true,
        params:{
        limit:30,
        skip:0,
        order:"new"
      },
      vertical:[]
    }
  },
  onLoad(options){
      console.log(options);
      this.id=options.id
      this.getList()
  },
  components: {uniSegmentedControl},

  methods: {
      onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
            this.params.order=this.items[e.currentIndex].order
            this.params.skip=0,
            this.vertical=[],
            this.getList()
        },
      getList(){
          this.request({
            url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
            data:this.params
          })
          .then(res=>{
              if(res.data.res.vertical.length===0){
                  this.hasMore=false
                  uni.showToast({
                      title:"没有更多的数据了"
                  })
              }
              this.vertical=[...this.vertical,...res.data.res.vertical]
              console.log(this.params);
          })
      },
      handleScrolltolower(){
          if(this.hasMore){
          this.params.skip += this.params.limit
          this.getList()
          }else{
              uni.showToast({
                  title:"没有更多数据了"
              })
          }
      }
  }
}
</script>

<style scoped lang="scss">
.cate{
    width: 100%;
    .cate_content{
        height: calc(100vh - 36px);
        display: flex;
        flex-wrap: wrap;
        .cate_content_item{
            width: 33.33%;
            border-right: 5px solid #fff;
            box-sizing: border-box;
            image{
                width: 100%;
            }

        }
    }
    .cate_title{
        .cate_title_inner{
            width: 60%;
            margin: 0 auto;
        }
    }
}
</style>