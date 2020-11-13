<template>
  <div class="history-page">
    <div class="history-header">
      <ModelTitle title="企业详情" />
      <div class="history-top">
        <div class="h-h-settled" @click="$router.push('/history/settledPage')">
          <img src="../../../assets/img/settled-icon.png" alt="">
          <p>入驻</p>
        </div>
        <div class="h-h-pic">
          <img :src="authorData.logoImg" alt="">
          <p>{{ authorData.businessName }}</p>
        </div>
        <div class="h-h-contact">
          <div class="h-h-c-num">
            <img src="../../../assets/img/mobile-icon.png" alt="">联系方式：{{
              authorData.phone
            }}
          </div>
          <div class="h-h-c-num">
            <img src="../../../assets/img/wx-icon.png" alt="">企业微信：{{
              authorData.weixinId
            }}
          </div>
        </div>
        <div class="h-h-info">
          {{ authorData.introduce }}
        </div>
      </div>
      <div class="history-more">
        <p>历史消息</p>
        <span @click="$router.push('/history/moreHistory')">更多</span>
      </div>
    </div>
    <div class="history-content">
      <HistoryDetails
        v-for="(h, index) in historyData.data"
        :key="index"
        :img="h.firstImg"
        :title="h.informationTitle"
        :date="formatTime(h.releaseDate)"
        :link="gotoDetail(h.id)"
      />
    </div>
  </div>
</template>

<script>
import HistoryDetails from '@/views/home/history/components/HistoryDetails'
import { formatTime } from '@/utils/time'
import ModelTitle from '@/components/ModelTitle/index'
/**
 * 首页（文章详情-author info）模块
 * @author lyh
 * @date 2020-04-08
 */
export default {
  name: 'HistoryPage',
  components: { ModelTitle, HistoryDetails },
  data() {
    return {
      authorId: this.$route.query.id,
      historyData: {
        data: []
      },
      authorData: {} // author info
    }
  },
  created() {
    this.findByAuthorId()
    this.findHistoryPage()
  },
  methods: {
    findByAuthorId() {
      this.$api.user.findByAuthorId({ authorId: this.authorId }).then(res => {
        if (res.status === 'SUCCESS') {
          this.authorData = res.data
        }
      })
    },
    formatTime,
    gotoDetail(id) {
      return {
        path: '/detailInfo',
        query: { id: id }
      }
    },
    // 历史消息
    findHistoryPage() {
      this.$api.home
        .findHistoryPage({
          authorId: this.authorId,
          pageSize: 10,
          pageNumber: 1
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.historyData = res.data
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.history-page {
  height: 100%;
  width: 100%;
  .history-header {
    background: #ffffff;
    .history-top {
      width: 100%;
      height: 245px;
      background: url("../../../assets/img/history-bg.png");
      background-size: 100% 100%;
      .h-h-settled {
        float: right;
        position: relative;
        top: 30px;
        right: 20px;
        img {
          width: 13px;
          height: 16px;
          margin: 0 auto;
        }
        p {
          font-size: 9px;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .h-h-pic {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        padding: 62px 0 24px 0;
        img {
          width: 65px;
          height: 65px;
          margin: 0 auto;
          border-radius: 50%;
        }
        p {
          color: #ffffff;
          margin-top: 6px;
        }
      }
      .h-h-contact {
        display: flex;
        padding: 0 16px;
        justify-content: space-between;
        .h-h-c-num {
          display: flex;
          color: #ffffff;
          height: 15px;
          line-height: 15px;
          font-size: 11px;
          font-weight: 400;
          img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
        }
      }
      .h-h-info {
        text-align: center;
        font-size: 11px;
        font-weight: 400;
        color: #ffffff;
        margin-top: 16px;
      }
    }
    .history-more {
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      justify-content: space-between;
      border-bottom: 1px solid #f1f2f6;

      p {
        font-size: 15px;
        font-weight: 500;
        color: rgba(133, 139, 147, 1);
      }

      span {
        font-size: 11px;
        font-weight: 400;
        color: rgba(133, 139, 147, 1);
      }
    }
  }

  .history-content {
    height: calc(100% - 335px);
    overflow-y: auto;
  }
}
</style>
