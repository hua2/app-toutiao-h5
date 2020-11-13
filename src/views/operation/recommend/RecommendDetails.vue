<template>
  <div class="detail-info">
    <DetailTitle :title="infoData.title" />
    <div class="detail-content">
      <div class="detail-header">
        <img src="http://oss.jiaomaenergy.com/PICTURE/2020-07-29/87c3c81baacc4177b9b6450f9f2346ad.png" alt="">
        <div class="d-h-content">
          <div class="d-h-info">
            <img
              :src="infoData.authorLogo"
              alt=""
              @click="authorClick(infoData.authorId)"
            >
            <div class="d-h-author">
              <p>{{ infoData.authorName }}</p>
              <span>发布时间：{{ formatTime(infoData.releaseDate) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-title">
        {{ infoData.title }}
      </div>
      <div class="detail-body">
        <Loading v-if="isLoading" />
        <div v-for="(i, info_index) in infoData.otherList" :key="info_index">
          <span v-if="i.state === 0"> {{ i.content }}</span>
          <img v-else-if="i.state === 1" :src="i.content" alt="">
          <video v-else controls :src="i.content" :poster="i.content + '?x-oss-process=video/snapshot,t_0000,f_jpg'" />
        </div>
      </div>
      <div class="detail-comment">
        <img src="../../../assets/img/hot-info-icon.png" alt="">
        <p>全部评论</p>
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
          <div class="d-p-info">
            <div style="display:flex;">
              <img :src="co.headPicUrl" alt="">
              <div class="d-p-title">
                <strong>{{ co.nickName }}</strong>
                <p>{{ co.content }}</p>
              </div>
            </div>
            <div class="d-p-date">
              {{ formatTime(co.createDate) }}
            </div>
          </div>
          <div class="d-p-edit">
            <div class="d-p-num">
              <img
                src="../../../assets/img/comment-down-icon.png"
                alt=""
                @click="replyCommentClick(co)"
              >
              <img
                v-if="co.isPraise === 0"
                src="../../../assets/img/comment-praise-icon.png"
                alt=""
                @click="praiseComment(co.id, 1)"
              >
              <img
                v-else
                src="../../../assets/img/comment-praise-active.png"
                alt=""
                @click="praiseComment(co.id, 0)"
              >
              <span :style="{ color: co.isPraise === 0 ? '#999' : '#ed9049' }">
                {{ co.praiseNum }}
              </span>
            </div>
            <div
              v-if="co.userId === $store.state.user.userId"
              class="d-p-update"
            >
              <span @click="deleteComment(co.id)">删除</span>
            </div>
          </div>
          <div class="d-p-more">
            <p @click="onMoreClick(co)">
              -- {{ co.showMore ? "收起评论" : "点击查看更多" }}
              <img src="../../../assets/img/triangle-down-icon.png" alt="">
            </p>
            <ReplyMoreList
              v-if="co.showMore"
              :reply-id="co.id"
              :parent-id="$route.query.id"
            />
          </div>
        </div>
      </List>
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
        <div class="d-f-comment ml-12">
          <img
            v-if="operate.isPraise === 0"
            src="../../../assets/img/praise-icon.png"
            alt=""
            @click="praiseInfo(1)"
          >
          <img
            v-else
            src="../../../assets/img/praise-active-icon.png"
            alt=""
            @click="praiseInfo(0)"
          >
          <p :style="{ color: operate.isPraise === 0 ? '#000' : '#FC7173' }">
            点赞
          </p>
        </div>
      </div>
    </div>
    <ActionSheet
      v-model="replyComment.show"
      :title="'正在回复 ' + replyComment.nickName"
    >
      <Field
        v-model="replyComment.content"
        rows="2"
        autosize
        type="textarea"
        placeholder="请输入回复内容"
      />
      <div class="detail-btn">
        <Button type="primary" block @click="doReplyComment">回复</Button>
      </div>
    </ActionSheet>
  </div>
</template>

<script>
/**
 * 风电运维(推荐)模块
 * @author lyh
 * @date 2020-07-28
 */
import { List, Button, Field, Loading, Toast, ActionSheet } from 'vant'
import { formatTime } from '@/utils/time'
import DetailTitle from '@/views/home/components/DetailTitle'
import ReplyMoreList from '@/views/operation/recommend/components/ReplyMoreList'

export default {
  name: 'RecommendDetails',
  components: {
    ReplyMoreList,
    Loading,
    DetailTitle,
    List,
    Field,
    Button,
    ActionSheet
  },
  data() {
    return {
      id: this.$route.query.id,
      cateListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        totalPage: 0
      },
      isLoading: false,
      value: '',
      operate: {
        isPraise: 0
      },
      infoData: {
        otherList: []
      },
      replyComment: {
        show: false,
        userId: null,
        nickName: '',
        content: ''
      }
    }
  },
  created() {
    this.findDetail()
    this.onLoad()
  },
  methods: {
    onMoreClick(co) {
      co.showMore = !co.showMore
      this.$forceUpdate()
    },
    replyCommentClick(co) {
      this.replyComment.nickName = co.nickName
      this.replyComment.userId = co.userId
      this.replyComment.id = co.id
      this.replyComment.show = true
    },
    doReplyComment() {
      this.$api.expert
        .publishComment({
          parentId: this.id,
          userId: this.$store.state.user.userId,
          replyUserId: this.replyComment.userId,
          replyId: this.replyComment.id,
          content: this.replyComment.content
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('发布成功！')
            this.replyComment.show = false
            this.replyComment.content = ''
            this.reload()
          }
        })
    },
    // 头部详情
    authorClick(id) {
      this.$router.push({
        path: '/recommend/headerDetails',
        query: { id: id }
      })
    },
    // 推荐观点评论发布
    publishClick() {
      this.$api.expert
        .publishComment({
          parentId: this.id,
          userId: this.$store.state.user.userId,
          replyUserId: null,
          content: this.value
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('发布成功！')
            this.value = ''
            this.reload()
          }
        })
    },
    formatTime,
    reload() {
      this.cateListData = {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        totalPage: 0
      }
      this.onLoad()
    },
    // 获取评论列表
    onLoad() {
      if (this.cateListData.finished) {
        return
      }
      this.cateListData.loading = true
      this.cateListData.pageNumber++
      this.$api.expert
        .findPage({
          parentId: this.id,
          userId: this.$store.state.user.userId,
          pageNumber: this.cateListData.pageNumber,
          pageSize: this.cateListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.cateListData.totalPage = res.data.totalPage
            this.cateListData.data = this.cateListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.cateListData.loading = false
          // 数据全部加载完成
          if (res.data === null) {
            this.cateListData.finished = true
          }
        })
    },
    // 推荐观点-详情
    findDetail() {
      this.isLoading = true
      this.$api.expert
        .findDetail({
          id: this.id,
          visitUserId: this.$store.state.user.userId
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isPraise = res.data.isPraise
            this.infoData = res.data
            document.title = this.infoData.title || '角马能源'
          }
          this.isLoading = false
        })
    },
    // 推荐观点-点赞
    praiseInfo(praise) {
      this.$api.expert
        .praiseInfo({
          viewpointId: this.id,
          userId: this.$store.state.user.userId,
          isPraise: praise
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.operate.isPraise = praise
          }
        })
    },
    // 推荐观点-点赞(评论列表)
    praiseComment(id, praise) {
      this.$api.expert
        .praiseComment({
          commentId: id,
          userId: this.$store.state.user.userId,
          isPraise: praise
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.reload()
          }
        })
    },
    // 推荐观点-删除 (评论列表的删除)
    deleteComment(id) {
      this.$api.expert
        .deleteComment({
          id: id,
          userId: this.$store.state.user.userId
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('删除成功！')
            this.reload()
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.detail-info {
  width: 100%;
  height: 100%;
  .reply-content {
    font-size: 16px;
    padding: 20px;
    background: #eee;
    margin: 20px;
  }
  .detail-content {
    height: calc(100% - 102px);
    overflow-y: auto;
    .detail-header {
      height: 200px;
      position: relative;
      top: 0;
      left: 0;
      margin-bottom: 16px;
      img {
        width: 100%;
        height: calc(100% - 1px);
        object-fit: cover;
      }
      .d-h-content {
        width: 100%;
        height: 46px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url("http://oss.jiaomaenergy.com/WAP/images/triangle.png");
        background-size: 100% 100%;
        .d-h-info {
          display: flex;
          width: 100%;
          height: 100%;
          padding-top: 18px;
          padding-left: 16px;
          img {
            width: 24px;
            height: 24px;
            overflow: hidden;
            border-radius: 50%;
            object-fit: cover;
          }
          .d-h-author {
            color: #858b93;
            display: flex;
            flex-direction: column;
            margin-left: 2px;
            p {
              width: 90px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 12px;
              min-height: 12px;
              height: 12px;
              font-size: 12px;
            }
            span {
              font-size: 8px;
            }
          }
        }
      }
    }
    .detail-title {
      margin: 0 12px;
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
    }
    .detail-body {
      color: #666;
      width: 100%;
      text-align: justify;
      font-size: 16px;
      padding: 16px;
      -webkit-font-smoothing: antialiased;
      span{
        white-space: pre-wrap;
      }
      video{
        margin: 6px auto;
      }
      img {
        margin: 12px auto;
      }
      .main .header h2 {
        color: #333;
        font-size: 17px;
        margin-bottom: 15px;
      }
    }

    .detail-comment {
      padding-left: 16px;
      height: 48px;
      align-items: center;
      display: flex;
      font-size: 14px;
      border-top: 4px solid #f1f2f6;
      border-bottom: 2px solid #f1f2f6;

      img {
        width: 24px;
        height: 20px;
      }

      p {
        margin-left: 6px;
      }
    }

    .detail-pic {
      margin-bottom: 8px;
      padding: 16px;
      font-size: 14px;
      border-bottom: 2px solid #f1f2f6;
      .d-p-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        .d-p-title {
          margin-left: 16px;

          p {
            margin-top: 6px;
          }
        }
        .d-p-date {
          color: #999999;
        }
      }
      .d-p-edit {
        display: flex;
        margin-top: 12px;
        justify-content: space-between;
        .d-p-num {
          display: flex;
          img {
            width: 18px;
            height: 18px;
            margin-left: 12px;
          }
          span {
            margin-left: 6px;
          }
        }
        .d-p-update {
          span {
            font-size: 12px;
            &:last-child {
              margin-left: 24px;
            }
          }
        }
      }
      .d-p-more {
        margin: 6px 12px;
        p {
          display: flex;
          img {
            width: 16px;
            height: 16px;
            margin-top: 3px;
          }
        }
        .d-p-reply {
          margin: 4px 0 4px 12px;
        }
      }
    }
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
        width: 288px;
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
  .detail-btn{
    /deep/ {
      .van-button--primary {
        width: 305px;
        border-radius: 5px;
        margin: 24px auto 12px;
        background-color: rgba(18, 18, 18, 1);
        border: 0.02667rem solid rgba(18, 18, 18, 1);
      }
    }
  }
}
</style>
