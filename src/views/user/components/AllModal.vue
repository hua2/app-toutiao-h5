<template>
  <div class="all-modal">
    <List
      v-model="personalData.loading"
      :finished="personalData.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(re, index) in personalData.data"
        :key="index"
        class="a-m-list"
      >
        <div class="flex justify-between items-center">
          <div @click="gotoDetail(re.id)">
            <h3 class="truncate-2">{{ re.title }}</h3>
            <div class="a-m-author">{{ re.authorName }}
              {{ re.commentNum }}
              评论 {{ formatTime(re.releaseDate) }}</div>
          </div>
        </div>
      </div>
    </List>
  </div>
</template>

<script>
import { List } from 'vant'
import { formatTime } from '@/utils/time'

export default {
  name: 'AllModal',
  components: { List },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      personalData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0
      }
    }
  },
  methods: {
    formatTime,
    gotoDetail(id) {
      this.$router.push({
        path: '/detailInfo',
        query: { id: id }
      })
    },
    // 个人主页-全部
    onLoad() {
      if (this.personalData.finished) {
        return
      }
      this.personalData.loading = true
      this.personalData.pageNumber++
      this.$api.ask
        .findPersonalShowPage({
          userId: this.id,
          keywords: '',
          pageNumber: this.personalData.pageNumber,
          pageSize: this.personalData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.personalData.data = this.personalData.data.concat(res.data.data) // 追加数据
          }
          this.personalData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.personalData.finished = true
          }
          console.log(this.personalData)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.all-modal{
  height: calc(100% - 45px);
  overflow-y: auto;
  .a-m-list{
      padding: 16px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f1f2f6;
      h3{
        font-size: 16px;
        margin-bottom: 12px;
        width: 100%;
        line-height: 18px;
      }
      h4{
        font-size: 16px;
        margin-bottom: 12px;
        width: 100%;
        line-height: 18px;
      }
      .a-m-author{
        color: #999999;
        font-size: 11px;
      }
  }
}
</style>
