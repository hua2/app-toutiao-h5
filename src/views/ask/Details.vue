<template>
  <div class="ask-details">
    <ModelTitle title="问答" />
    <div class="a-d-btn">
      <img src="../../assets/image/answer-btn.png" alt="">
    </div>
    <div class="content-height">
      <div class="a-d-border">
        <div class="a-d-logo flex items-center">
          <img :src="infoData.authorLogo" alt="">
          <span class="ml-6">{{ infoData.authorName }}</span>
        </div>
        <h3>{{ infoData.title }}</h3>
        <div class="a-d-author flex justify-between"><span>{{ infoData.answerNum }} 回答</span>
          <span v-if="operate.isCollect === 0" @click="collectInfo(1)"><Icon name="star-o">收藏问题</icon></span>
          <span v-else @click="collectInfo(0)"><Icon name="star">收藏问题</icon></span>
        </div>
      </div>
      <List
        v-model="askAnswerListData.loading"
        :finished="askAnswerListData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(ask, index) in askAnswerListData.data"
          :key="index"
          class="p-16"
        >
          <p class="truncate-2" @click="gotoDetail(ask.id)">{{ ask.contentShorter }}</p>
          <div class="a-d-author flex justify-between">
            <div class="a-d-logo flex items-center">
              <img :src="ask.authorLogo" alt="">
              <span class="ml-6">{{ ask.authorName }}</span>
            </div>
            <span><Icon name="chat-o" />{{ ask.commentNum }}
              <Icon v-if="ask.isCollect === 0" name="star-o" class="ml-8" @click="collectAskInfo(1,ask.id)" />
              <Icon v-else name="star" class="ml-8" @click="collectAskInfo(0, ask.id)" />
            </span></div>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import { Icon, List, Toast } from 'vant'
export default {
  name: 'Details',
  components: { ModelTitle, Icon, List },
  data() {
    return {
      id: this.$route.query.id,
      infoData: {},
      operate: {
        isCollect: 0
      },
      askAnswerListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        totalPage: 0
      }
    }
  },
  created() {
    this.findDetail()
    this.onLoad()
  },
  methods: {
    collectInfo(collect) {
      this.$api.app
        .collectMedia({
          id: this.id,
          userId: this.$store.state.user.userId,
          isCollect: collect
        }
        )
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isCollect = collect
          }
        })
    },
    collectAskInfo(collect, askId) {
      this.$api.app
        .collectMedia({
          id: askId,
          userId: this.$store.state.user.userId,
          isCollect: collect
        }
        )
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('操作成功！')
            this.onLoad()
          }
        })
    },
    gotoDetail(id) {
      this.$router.push({
        path: '/detailInfo',
        query: { id: id }
      })
    },
    onLoad() {
      if (this.askAnswerListData.finished) {
        return
      }
      this.askAnswerListData.loading = true
      this.askAnswerListData.pageNumber =
          (this.askAnswerListData.data.length % this.askAnswerListData.pageSize) + 1
      this.$api.ask
        .findAnswerPage({
          uid: this.$store.state.user.userId || '',
          pid: this.id,
          pageNumber: this.askAnswerListData.pageNumber,
          pageSize: this.askAnswerListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.askAnswerListData.totalPage = res.data.totalPage
            this.askAnswerListData.data = this.askAnswerListData.data.concat(res.data.data) // 追加数据
          }
          this.askAnswerListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.askAnswerListData.finished = true
          }
        })
    },
    findDetail() {
      this.$api.app
        .findDetail({
          id: this.id,
          uid: this.$store.state.user.userId || ''
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isCollect = res.data.isCollect
            this.infoData = res.data
            document.title = this.infoData.informationTitle || '角马能源'
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.ask-details{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .a-d-btn{
    position: absolute;
    top: 10px;
    right: 4px;
    z-index: 1;
    img{
      width: 25px;
      height: 25px;
      margin-right: 6px;
    }
  }
  .a-d-author {
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }

    span {
      font-size: 8px;
      color: #797676;
      line-height: 11px;
      letter-spacing: 1px;
    }
  }

  .a-d-border {
    padding: 16px;
    border-bottom: 4px solid #f1f2f6;
    .a-d-logo {
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }

      span {
        font-size: 11px;
        color: #999999;
      }
    }

    h3 {
      font-size: 16px;
      font-weight: 500;
      color: #050505;
      margin: 10px 0;
    }
  }
  p{
    font-size: 13px;
    color: #6C6969;
    line-height: 20px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
}
</style>
