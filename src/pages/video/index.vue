<template>
  <view class="video">
    <view class="video_section">
        <uni-segmented-control 
        :current="current" 
        :values="items.map(v=>v.title)" 
        @clickItem="onClickItem" 
        style-type="text" 
        active-color="#d4237a"></uni-segmented-control>
        
    </view>
    <view class="content">
            <view v-if="current < 4">
              <video-category :urlObj="items[current]"></video-category>
            </view>
            <view v-if="current === 4">
              <video-main :urlObj="items[current]"></video-main>
            </view>
            
        </view>
  </view>
</template>

<script>
import  {uniSegmentedControl}  from "@dcloudio/uni-ui";
import videoCategory from "./video-category/index"
import videoMain from "./video-main/index"
export default {
components: {uniSegmentedControl,videoCategory,videoMain},
    data() {
        return {
            items: [
        { title: "推荐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"} },
        { title: "娱乐",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"} },
        { title: "最新",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"} },
        { title: "热门",url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"} },
        { title: "分类",url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"} } 
      ],
      current: 0
    };
        
    },

  components: {},

methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    }
}
</script>

<style scoped>

.video_section{
  width: 60%;
  margin: 0 auto;
}
.video{
  width: 100%;
}
</style>