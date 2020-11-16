<template>
  <div class="ask">
    <ModelTitle title="问答" />
    <div class="except-tabbar-height">
      <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <SwipeItem v-for="(pic, index) in bannerData" :key="index">
          <VanImage
            :src="pic.bannerImgUrl"
            height="100%"
            @click="openLink(pic)"
          />
        </SwipeItem>
      </Swipe>
      <div class="ask-btn">
        <div class="ask-pic" @click="$router.push('/ask/answerList')">
          <img src="../../assets/image/ques-icon.png" alt="" class="img">
          <span>回答</span>
        </div>
        <div class="ask-pic" @click="$router.push('/ask/publishAnswer')">
          <img src="../../assets/image/ask-icon.png" alt="">
          <span>提问</span>
        </div>
      </div>
      <div class="ask-content">
        <List
          v-model="askListData.loading"
          :finished="askListData.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(a, index) in askListData.data"
            :key="index"
            class="a-c-info"
          >
            <div @click="gotoDetail(a.pid)">
              <h3 class="truncate-2">{{ a.title }}</h3>
              <p class="truncate-2">{{ a.contentShorter }}</p>
              <div v-if="a.imgsList && a.imgsList.length === 3">
                <div v-for="(i,indexImg) in a.imgsList" :key="indexImg" class="a-c-img">
                  <img :src="i" alt="">
                </div>
              </div>
            </div>
            <div class="ask-author flex items-center">
              <img :src="a.authorLogo" alt="" @click="authorClick(a.authorId)">
              <span @click="authorClick(a.authorId)">{{ a.authorName }}</span> <span>{{ a.commentNum }} 评论 </span><span>{{ formatTime(a.releaseDate) }}</span>
            </div>
          </div>
        </List>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Swipe, SwipeItem, List } from 'vant'
import VanImage from '@/components/VanImage/index'
import ModelTitle from '@/components/ModelTitle/index'
import Footer from '@/components/Footer/index'
import { formatTime } from '@/utils/time'
export default {
  name: 'Index',
  components: { Footer, ModelTitle, VanImage, Swipe, SwipeItem, List },
  data() {
    return {
      bannerData: [],
      askListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0
      }
    }
  },
  created() {
    this.banner()
    this.onLoad()
  },
  methods: {
    authorClick(id) {
      this.$router.push({
        path: '/user/personalPage',
        query: { id: id }
      })
    },
    formatTime,
    gotoDetail(id) {
      this.$router.push({
        path: '/ask/details',
        query: { id: id }
      })
    },
    // 首页banner
    banner() {
      this.$api.ask
        .banner({
          pageSize: '',
          page: '',
          bannerTitle: '',
          status: ''
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.bannerData = res.data
          }
        })
    },
    openLink(b) {
      if (b.bannerJump === '0') {
        this.$router.push({
          path: '/ask/details',
          query: { id: b.bannerJumpId }
        })
      } else {
        window.open(b.bannerJumpUrl)
      }
    },
    onLoad() {
      if (this.askListData.finished) {
        return
      }
      this.askListData.loading = true
      this.askListData.pageNumber++
      this.$api.ask
        .findAndAnswerIndexPage({
          pageNumber: this.askListData.pageNumber,
          pageSize: this.askListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.askListData.data = this.askListData.data.concat(res.data.data) // 追加数据
          }
          this.askListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.askListData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.ask{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .my-swipe {
    width: 100%;
    height: 188px;
  }
  .ask-btn{
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
    border-bottom: 2px solid #f1f2f6;
    .ask-pic{
      display: flex;
      align-items: center;
      .img{
        width: 38px;
      }
      img{
        width: 33px;
        height: 33px;
      }
      span{
        font-size: 18px;
        font-weight: 500;
        color: #050505;
        line-height: 25px;
        letter-spacing: 2px;
        margin-left: 6px;
      }
    }
  }
  .ask-content{
    .a-c-info{
      margin-top: 16px;
      padding: 0 16px 16px;
      border-bottom: 2px solid #f1f2f6;
      h3{
        font-size: 16px;
        font-weight: 500;
        color: #050505;
      }
      p{
        font-size: 13px;
        color: #6C6969;
        line-height: 20px;
        letter-spacing: 1px;
        margin: 10px 0;
      }
      .a-c-img{
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        img{
          width: 110px;
          height: 75px;
        }
      }
      .ask-author{
        img{
          width: 15px;
          height: 15px;
          border-radius: 50%;
        }
        span{
          font-size: 8px;
          color: #797676;
          line-height: 11px;
          letter-spacing: 1px;
          margin-left: 12px;
        }
      }
    }

  }

}
</style>
