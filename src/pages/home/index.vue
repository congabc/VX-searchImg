<template>
  <view class="home-tab">
    <view class="home-tab-title">
       <uni-segmented-control
      :current="current"
      :values="items.map(v=>v.title)"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#d4237a"
    ></uni-segmented-control>
    </view>
    <view class="home-tab-content">
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-cetegory></home-cetegory>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from "./home-album";
import homeCetegory from "./home-cetegory";
import homeNew from "./home-new";
import homeRecommend from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 3,
    };
  },

  components: {
    homeAlbum,
    homeCetegory,
    homeNew,
    homeRecommend,
    uniSegmentedControl,
  },

  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.home-tab{
  width: 750rpx;
  .home-tab-title{
    width: 60%;
    margin: 0 auto;
  }
  .home-tab-content{
    padding: 10rpx 10rpx;
  }
}

</style>