<template>
  <div class="home">
    <div class="home-header">
      <div class="home-search">
        <Search
          v-model="keyword"
          disabled-s
          shape="round"
          placeholder="搜索"
          @search="onSearch"
          @cancel="onCancel"
        />
        <img src="../../assets/image/home-apply.png" alt="" @click="showClick">
        <span class="ml-6" @click="showClick">发布</span>
        <Popup
          v-model="show"
          round
          closeable
          close-icon="http://oss.jiaomaenergy.com/OTHER/2020-11-11/778e81880fdf4d7fb8b00aa36ba30e6f.png"
          position="bottom"
          close-icon-position="bottom-left"
          :style="{ height: '30%' }"
          class="publish-btn"
        >
          <h4 v-if="!account">立即登录 ></h4>
          <div v-else class="p-b-popup flex">
            <div class="flex items-center">
              <img :src="account.headPicUrl" alt="">
              <span>{{ account.nickName }}</span>
            </div>
            <span @click="$router.push('/ask/draftBoxList')">草稿箱</span>
          </div>
          <div class="flex justify-around">
            <div class="p-b-pic" @click="$router.push('/ask/publishArticle')">
              <img src="../../assets/image/article-pub-icon.png" alt="">
              <p>发文章</p>
            </div>
            <div class="p-b-pic" @click="$router.push('/ask/publishAnswer')">
              <img src="../../assets/image/ask-pub-icon.png" alt="">
              <p>发提问</p>
            </div>
            <div class="p-b-pic" @click="$router.push('/ask/publishVideo')">
              <img src="../../assets/image/video-pub-icon.png" alt="">
              <p>发视频</p>
            </div>
          </div>
        </Popup>
      </div>
      <Tabs v-model="active" sticky>
        <Tab title="推荐·要闻">
          <Recommend />
        </Tab>
        <Tab
          v-for="(trade, index) in tradeData"
          :key="index"
          :title="trade.title"
          :name="trade.id"
        >
          <Equipment :id="trade.id" />
        </Tab>
      </Tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
/**
 * 首页模块
 * @author lyh
 * @date 2020-04-01
 */
import { Search, Tab, Tabs, Toast, Popup } from 'vant'
import Recommend from '@/views/home/Recommend'
import Equipment from '@/views/home/Equipment'
import Footer from '@/components/Footer/index'
export default {
  name: 'Index',
  components: { Footer, Equipment, Recommend, Search, Tab, Tabs, Popup },
  data() {
    return {
      keyword: '',
      active: 0,
      tradeData: [],
      show: false,
      status: ''
    }
  },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  },
  created() {
    this.queryDeviceMeta()
    this.$bus.$on('homeTabChange', data => {
      this.active = data
    })
  },
  beforeDestroy() {
    this.$bus.$off('homeTabChange')
  },
  methods: {
    showClick() {
      this.show = true
    },
    onSearch(val) {
      const column = this.tradeData[this.active - 1]
      this.$router.push({
        path: '/search',
        query: { keyword: val, columnId: column ? column.id : null }
      })
    },
    onCancel(val) {
      Toast(val)
    },
    // 首页tab
    queryDeviceMeta() {
      this.$api.home.queryDeviceMeta().then(res => {
        if (res.status === 'SUCCESS') {
          this.tradeData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /deep/{
    .van-tabs__line {
      z-index: 100;
      background-color: #000000;
    }
  }
  img {
    width: 375px;
    height: 188px;
    object-fit: cover;
  }
  .home-header {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
    // 隐藏 滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }
  /deep/{
    .van-popup__close-icon--bottom-left{
      left: 50%;
      .van-icon__image{
        width: 25px;
        height: 25px;
      }
    }
  }
  .home-search{
    display: flex;
    align-items: center;
    position: relative;
    .van-search{
      width: 308px;
    }
    img{
      width: 25px;
      height: 25px;
    }
    span{
      font-size: 14px;
    }
  }
}
</style>
