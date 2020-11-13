<template>
  <div class="index-details">
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
        </div>
        <div class="detail-body">
          <div v-html="infoData.content" />
        </div>
      </div>
    </div>
    <div class="details-footer">
      <img src="../../assets/img/logo.png" alt="">
      <a href="https://jiaomaenergy.com/download">立即下载</a>
    </div>
  </div></template>

<script>
import { formatTime } from '@/utils/time'
export default {
  name: 'ShareDetailsVue',
  components: { },
  data() {
    return {
      infoData: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.findDetail()
  },
  methods: {
    formatTime,
    // 获取点赞 收藏状态
    findDetail() {
      this.$api.app
        .findDetail({
          id: this.id
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.infoData = res.data
            document.title = this.infoData.informationTitle || '角马能源'
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
      .details-footer{
        width: 100%;
        align-items: center;
        height: 56px;
        display: flex;
        padding: 0 12px;
        background: #d8d8d8;
        justify-content: space-between;
        img{
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        a{
          font-size: 16px;
        }
      }
    }
</style>
