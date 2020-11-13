<template>
  <div class="video">
    <ModelTitle title="角马视频" />
    <div class="except-tabbar-height">
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
            <span>草稿箱</span>
          </div>
          <div class="flex justify-around">
            <div class="p-b-pic">
              <img src="../../assets/image/article-pub-icon.png" alt="">
              <p>发文章</p>
            </div>
            <div class="p-b-pic">
              <img src="../../assets/image/ask-pub-icon.png" alt="">
              <p>发提问</p>
            </div>
            <div class="p-b-pic">
              <img src="../../assets/image/video-pub-icon.png" alt="">
              <p>发视频</p>
            </div>
          </div>
        </Popup>
      </div>
      <List
        v-model="videoListData.loading"
        :finished="videoListData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(v, index) in videoListData.data"
          :key="index"
          class="mt-12"
        >
          <video controls :src="v.videoUrl" :poster="v.videoUrl + '?x-oss-process=video/snapshot,t_0000,f_jpg'" />
          <div class="p-10">
            <div class="video-title" @click="goVideoDetails(v.id)">
              <h3 class="truncate">{{ v.title }}</h3>
              <span>{{ formatTime(v.releaseDate) }}</span>
            </div>
            <div class="video-author">
              <div class="a-d-logo flex items-center">
                <img :src="v.authorLogo" alt="">
                <span class="ml-6">{{ v.authorName }}</span>
              </div>
              <span v-if="v.isCollect === 0" @click="praiseInfo(1,v.id)"><Icon name="like-o" /></span>
              <span v-else><Icon name="like-o" @click="praiseInfo(0,v.id)" /></span>
            </div>
          </div>
        </div>
      </List>
    </div>
    <Footer />
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import { formatTime } from '@/utils/time'
import Footer from '@/components/Footer/index'
import { Search, Toast, Icon, Popup, List } from 'vant'

/**
 * 角马视频模块
 * @author lyh
 * @date 2020-03-19
 */
export default {
  name: 'Index',
  components: { Footer, ModelTitle, Search, Icon, Popup, List },
  data() {
    return {
      keyword: '',
      show: false,
      videoListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        totalPage: 0
      }
    }
  },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  },
  created() {
  },
  methods: {
    praiseInfo(praise, id) {
      this.$api.app
        .praiseMedia({
          id: id,
          userId: this.$store.state.user.userId,
          isPraise: praise
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.onLoad()
          }
        })
    },
    showClick() {
      this.show = true
    },
    onSearch(val) {
      this.$router.push({
        path: '/search',
        query: { keyword: val }
      })
    },
    onCancel(val) {
      Toast(val)
    },
    // 视频详情页
    goVideoDetails(id) {
      this.$router.push({
        path: '/detailInfo',
        query: { id: id }
      })
    },
    formatTime,
    // 视频列表分页
    onLoad() {
      if (this.videoListData.finished) {
        return
      }
      this.videoListData.loading = true
      this.videoListData.pageNumber =
        (this.videoListData.data.length % this.videoListData.pageSize) + 1
      this.$api.ask
        .findMediaVideo({
          pageNumber: this.videoListData.pageNumber,
          pageSize: this.videoListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.videoListData.totalPage = res.data.totalPage
            this.videoListData.data = this.videoListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.videoListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.videoListData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.video {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  /deep/{
    .van-popup__close-icon--bottom-left{
      left: 50%;
      .van-icon__image{
        width: 25px;
        height: 25px;
      }
    }
  }
  .video-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;
    h3 {
      font-size: 14px;
      font-weight: 500;
      color: #050505;
    }
  }
  span {
    font-size: 8px;
    color: #797676;
    line-height: 11px;
    letter-spacing: 1px;
  }
  .video-author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 12px;
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
  }
}
</style>
