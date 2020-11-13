<template>
  <List
    v-model="recommendListData.loading"
    :finished="recommendListData.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      v-for="(r, index) in recommendListData.data"
      :key="index"
      class="recommend-list"
      @click="gotoDetail(r.id)"
    >
      <div class="r-l-title">
        <h3>{{ r.title }}</h3>
      </div>
      <div style="padding: 0 12px 12px">
        <div class="r-l-info truncate-4">
          {{ r.content }}
        </div>
        <div class="r-l-view">
          <div class="r-l-logo">
            <img v-for="(p, po) in r.headImg" :key="po" :src="p">
            <img src="../../../../assets/img/operation-more.png">
            <p>{{ r.commentPeople }}人发布观点</p>
          </div>
          <div class="r-l-num">
            <img src="../../../../assets/img/preview-num-icon.png">
            <span>{{ r.commentNum }}</span>
            <img src="../../../../assets/img/pointer-num-icon.png">
            <span> {{ r.praiseNum }}</span>
          </div>
        </div>
      </div>
    </div>
  </List>
</template>

<script>
/**
 * 风电运维(首页-推荐(头像详情)通用)模块
 * @author lyh
 * @date 2020-07-21
 */
import { List } from 'vant'
import { formatTime } from '@/utils/time'
export default {
  name: 'HeaderDetailsList',
  components: { List },
  props: {
    id: {
      required: false,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      recommendListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0
      }
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    formatTime,
    gotoDetail(id) {
      this.$router.push({
        path: '/recommend/recommendDetails',
        query: { id: id }
      })
    },
    // 推荐观点/个人详情列表
    onLoad() {
      if (this.recommendListData.finished) {
        return
      }
      this.recommendListData.loading = true
      this.recommendListData.pageNumber++
      this.$api.expert
        .findViewPointBeanPage({
          userId: this.$store.state.user.userId,
          pageNumber: this.recommendListData.pageNumber,
          pageSize: this.recommendListData.pageSize,
          industryId: this.id
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.recommendListData.data = this.recommendListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.recommendListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.recommendListData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend-list {
  width: 343px;
  margin: 12px auto;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);
  .truncate-4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .r-l-title {
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 600;
      margin-left: 12px;
      color: rgba(0, 0, 0, 1);
    }
  }
  .r-l-info {
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    text-align: justify;
  }
  .r-l-view {
    display: flex;
    color: #9da2aa;
    height: 64px;
    align-items: center;
    justify-content: space-between;
    .r-l-logo {
      display: flex;
      font-size: 12px;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-left: -6px;
        border-radius: 50%;
        overflow: hidden;
        &:first-child {
          margin-left: unset;
        }
      }
      p {
        margin-left: 6px;
      }
    }
    .r-l-num {
      height: 15px;
      display: flex;
      img {
        margin: 2px 6px 2px 0;
        width: 11px;
        height: 11px;
      }
      span {
        height: 15px;
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;
        margin-right: 16px;
      }
    }
  }
}
</style>
