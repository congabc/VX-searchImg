<template>
  <view class="video">
    <view class="video_section">
        <uni-segmented-control 
        :current="current" 
        :values="items" 
        @clickItem="onClickItem" 
        style-type="button" 
        active-color="#4cd964"></uni-segmented-control>
        <view class="content">
            <view v-if="current === 0">
                选项卡1的内容
            </view>
            <view v-if="current === 1">
                选项卡2的内容
            </view>
            <view v-if="current === 2">
                选项卡3的内容
            </view>
            <view v-if="current === 2">
                选项卡4的内容
            </view>
            <view v-if="current === 2">
                选项卡5的内容
            </view>
        </view>
    </view>
  </view>
</template>

<script>
import  {uniSegmentedControl}  from "@dcloudio/uni-ui";
export default {
components: {uniSegmentedControl},
    data() {
        return {
            items: ['推荐','娱乐','最新','热门','分类'],
            current: 0
        }
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
</style>