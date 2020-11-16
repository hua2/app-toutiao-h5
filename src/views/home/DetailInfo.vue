<template>
  <div class="index-details">
    <DetailTitle :title="infoData.title" />
    <div class="details-content">
      <div class="i-d-details">
        <h3>{{ infoData.title }}</h3>
        <div class="i-d-content">
          <div class="i-d-info">
            <img :src="infoData.authorLogo" alt="">
            <div class="i-d-author">
              <p>{{ infoData.authorName }}</p>
              <span>{{ formatTime(infoData.releaseDate) }}</span>
            </div>
          </div>
          <strong
            v-if="infoData.isAttention === 0"
            @click="attentionExpert(infoData.authorId, 1)"
          >关注</strong>
          <strong
            v-else
            @click="attentionExpert(infoData.authorId, 0)"
          >已关注</strong>
        </div>
        <div class="detail-body">
          <Loading v-if="isLoading" />
          <div v-if="infoData.videoUrl">
            <video
              autoplay
              muted
              loop
              :src="infoData.videoUrl"
              :poster="infoData.videoUrl + '?x-oss-process=video/snapshot,t_0000,f_jpg'"
            />
          </div>
          <div v-else v-html="infoData.content" />
          <div class="detail-comment">
            <img src="../../assets/img/hot-info-icon.png" alt="">
            <p>热门评论</p>
          </div>
          <List
            v-model="cateListData.loading"
            :finished="cateListData.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(co, index) in cateListData.data"
              :key="index"
              class="detail-pic"
            >
              <div style="display:flex;">
                <img :src="co.headPicUrl" alt="">
                <div class="d-p-title">
                  <strong>{{ co.nickName }}</strong>
                  <p>{{ co.content }}</p>
                </div>
              </div>
              <div class="detail-date">{{ formatTime(co.createDate) }}</div>
            </div>
          </List>
        </div>
      </div>
    </div>
    <div class="detail-footer">
      <Field v-model="value" center clearable label="" placeholder="评论...">
        <template #button>
          <Button
            size="small"
            type="primary"
            :disabled="value === ''"
            @click="publishClick"
          >
            提交
          </Button>
        </template>
      </Field>
      <div style="display: flex">
        <div class="d-f-comment">
          <img
            v-if="operate.isCollect === 0"
            src="../../assets/img/collect-icon.png"
            alt=""
            @click="collectInfo(1)"
          >
          <img
            v-else
            src="../../assets/img/collect-active-icon.png"
            alt=""
            @click="collectInfo(0)"
          >
          <p :style="{ color: operate.isCollect === 0 ? '#000' : '#FC7173' }">
            收藏
          </p>
        </div>
        <div class="d-f-comment ml-12">
          <img
            v-if="operate.isPraise === 0"
            src="../../assets/img/praise-icon.png"
            alt=""
            @click="praiseInfo(1)"
          >
          <img
            v-else
            src="../../assets/img/praise-active-icon.png"
            alt=""
            @click="praiseInfo(0)"
          >
          <p :style="{ color: operate.isPraise === 0 ? '#000' : '#FC7173' }">
            点赞
          </p>
        </div>
      </div>
    </div>
  </div></template>

<script>
import { Loading, List, Field, Button, Toast } from 'vant'
import { formatTime } from '@/utils/time'
import DetailTitle from '@/views/home/components/DetailTitle'
export default {
  name: 'Index',
  components: { DetailTitle, Loading, List, Field, Button },
  data() {
    return {
      isLoading: false,
      cateListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        totalPage: 0
      },
      operate: {
        isCollect: 0,
        isPraise: 0
      },
      value: '',
      infoData: {},
      id: this.$route.query.id
    }
  },
  created() {
    this.findDetail()
    this.onLoad()
  },
  methods: {
    // 关注
    attentionExpert(id, status) {
      this.$api.app
        .attentionAttention({
          uid: this.$store.state.user.userId,
          auid: id,
          isAttention: status
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.infoData.isAttention = status
          }
        })
    },
    // 发布评论
    publishClick() {
      this.$api.app
        .publishComment({
          type: 0,
          aid: this.id,
          uid: this.$store.state.user.userId,
          content: this.value
        }
        )
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('发布成功！')
            this.value = ''
            this.cateListData.finished = false
            setTimeout(() => {
              this.onLoad()
            }, 1000)
          }
        })
    },
    formatTime,
    // 获取评论列表
    onLoad() {
      if (this.cateListData.finished) {
        return
      }
      this.cateListData.loading = true
      this.cateListData.pageNumber =
                (this.cateListData.data.length % this.cateListData.pageSize) + 1
      this.$api.app
        .findPageComment({
          type: 0,
          uid: this.$store.state.user.userId,
          aid: this.id,
          pageNumber: this.cateListData.pageNumber,
          pageSize: this.cateListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            // this.cateListData.totalPage = res.data.totalPage
            this.cateListData.data = this.cateListData.data.concat(
              res.data ? res.data.data : []
            ) // 追加数据
          }
          this.cateListData.loading = false
          // 数据全部加载完成
          if (res.data === null) {
            this.cateListData.finished = true
          }
        })
    },
    // 获取点赞 收藏状态
    findDetail() {
      this.isLoading = true
      this.$api.app
        .findDetail({
          id: this.id,
          uid: this.$store.state.user.userId || ''
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isPraise = res.data.isPraise
            this.operate.isCollect = res.data.isCollect
            this.infoData = res.data
            document.title = this.infoData.informationTitle || '角马能源'
          }
          this.isLoading = false
        })
    },
    praiseInfo(praise) {
      this.$api.app
        .praiseMedia({
          id: this.id,
          userId: this.$store.state.user.userId,
          isPraise: praise
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isPraise = praise
          }
        })
    },
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
    }
  }
}
</script>

<style scoped lang="scss">
  .index-details{
    width: 100%;
    height: 100%;
    .details-content{
      height: calc(100% - 102px);
      overflow-y: auto;
    }
    .detail-footer {
      /deep/ {
        .van-cell {
          padding: 4px;
          margin: 0 12px;
        }

        .van-field__label {
          display: none;
        }

        .van-cell__value {
          padding-left: 16px;
        }

        .van-cell--center {
          width: 268px;
          border-radius: 30px;
          background-color: #f1f2f6;
        }
        .van-button--primary {
          color: #000;
          background-color: #f1f2f6;
          border: 0.02667rem solid #f1f2f6;
        }
      }

      display: flex;
      align-items: center;
      width: 100%;
      height: 56px;
      background: #ffffff;

      .ml-12 {
        margin-left: 12px;
      }

      .d-f-comment {
        line-height: 26px;

        img {
          width: 22px;
          height: 22px;
          margin: 0 auto;
        }

        p {
          font-size: 12px;
        }
      }
    }
  }
</style>
