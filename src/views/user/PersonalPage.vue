<template>
  <div class="p-h-page">
    <ModelTitle title="个人主页" />
    <div class="content-height">
      <div class="p-h-logo flex items-center">
        <img :src="detailData.headPicUrl" alt="">
        <div class="p-h-num">
          <div class="flex">
            <div>
              <span>{{ detailData.mediaNum }}</span>
              <p>新闻</p>
            </div>
            <div>
              <span>{{ detailData.attentionNum }}</span>
              <p>关注</p>
            </div>
            <div>
              <span>{{ detailData.fansNum }}</span>
              <p>粉丝</p>
            </div>
          </div>
          <div v-if="$store.state.user.userId !== detailData.id">
            <button
              v-if="detailData.isAttention === 0"
              @click="attentionExpert(detailData.id, 1)"
            >关注</button>
            <button
              v-else
              @click="attentionExpert(detailData.id, 0)"
            >已关注</button>
          </div>
        </div>
      </div>
      <div class="p-h-list">
        <h4>全部</h4>
        <AllModal :id="detailData.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import AllModal from '@/views/user/components/AllModal'
export default {
  name: 'PersonalPage',
  components: { AllModal, ModelTitle },
  data() {
    return {
      detailData: {},
      id: this.$route.query.id
    }
  },
  created() {
    this.personDetailsInfo()
  },
  methods: {
    personDetailsInfo() {
      this.$api.user
        .personDetailsInfo(
          this.id ? this.id : this.$store.state.user.userId,
          this.$store.state.user.userId,
        )
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.detailData = res.data
          }
        })
    },
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
            this.personDetailsInfo()
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.p-h-page{
  width: 100%;
  height: 100%;
  .p-h-logo{
    padding: 16px;
    height: 120px;
    border-bottom: 4px solid #f1f2f6;
    .p-h-num{
      line-height: 24px;
      text-align: center;
      margin-left: 32px;
    }
    img{
      width: 88px;
      height: 88px;
      border-radius: 50%;
    }
    span,p{
      font-size: 14px;
      color: #797676;
      margin-left: 32px;
    }
    button {
        color: #FA2400;
        font-size: 11px;
      }
  }
  .p-h-list{
    height: calc(100% - 120px);
    h4{
      font-size: 24px;
      padding: 8px 0 0 16px;
    }
  }
}

</style>
