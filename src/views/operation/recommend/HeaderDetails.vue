<template>
  <div class="detail-info">
    <DetailTitle title="专家详情" />
    <div class="detail-content">
      <div class="detail-header">
        <img :src="infoData.headImg" alt="">
        <div class="d-h-content">
          <div class="d-h-info">
            <img :src="infoData.headImg" alt="">
            <div class="d-h-author">
              <p>{{ infoData.companyName }}</p>
              <span>{{ infoData.realName }} | {{ infoData.post }} </span>
            </div>
            <strong
              v-if="infoData.isAttention === 0"
              @click="attentionExpert(infoData.id, 1)"
            >关注</strong>
            <strong
              v-else
              @click="attentionExpert(infoData.id, 0)"
            >已关注</strong>
          </div>
        </div>
      </div>
      <HeaderDetailsList />
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'
import DetailTitle from '@/views/home/components/DetailTitle'
import HeaderDetailsList from '@/views/operation/recommend/components/HeaderDetailsList'

export default {
  name: 'HeaderDetails',
  components: { HeaderDetailsList, DetailTitle },
  data() {
    return {
      infoData: {},
      id: this.$route.query.id
    }
  },
  created() {
    this.findExpertDetail()
  },
  methods: {
    formatTime,
    // 专家详情
    findExpertDetail() {
      this.$api.expert
        .findExpertDetail({
          id: this.id,
          userId: this.$store.state.user.userId
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.infoData = res.data
          }
        })
    },
    // 专家关注
    attentionExpert(id, status) {
      this.$api.expert
        .attentionExpert({
          appUserId: this.$store.state.user.userId,
          expertId: id,
          isAttention: status
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.infoData.isAttention = status
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
          strong {
            font-size: 14px;
            cursor: pointer;
            margin: 6px 0 0 12px;
            color: rgba(82, 158, 237, 1);
          }
        }
      }
    }
  }
}
</style>
