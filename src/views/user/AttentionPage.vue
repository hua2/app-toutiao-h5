<template>
  <div class="attention-page">
    <ModelTitle title="我的关注" />
    <div class="content-height">
      <List
        v-model="attentionData.loading"
        :finished="attentionData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(a,index) in attentionData.data" :key="index" class="a-p-list flex">
          <img :src="a.headPicUrl" alt="">
          <span>{{ a.nickName }}</span>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'AttentionPage',
  components: { ModelTitle },
  data() {
    return {
      attentionData: {
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
    onLoad() {
      if (this.attentionData.finished) {
        return
      }
      this.attentionData.loading = true
      this.attentionData.pageNumber++
      this.$api.ask
        .findAttentionPage({
          userId: this.$store.state.user.userId,
          pageNumber: this.attentionData.pageNumber,
          pageSize: this.attentionData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.attentionData.data = this.attentionData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.attentionData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.attentionData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.attention-page{
  width: 100%;
  .a-p-list{
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f1f2f6;
    img{
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
    span{
      font-size: 8px;
      color: #797676;
      margin-left: 8px;
    }
  }

}
</style>
