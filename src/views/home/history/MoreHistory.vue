<template>
  <div class="more-history">
    <ModelTitle title="历史消息" />
    <div class="content-height">
      <List
        v-model="historyData.loading"
        :finished="historyData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <HistoryDetails
          v-for="(h, index) in historyData.data"
          :key="index"
          :img="h.firstImg"
          :title="h.informationTitle"
          :date="formatTime(h.releaseDate)"
          :link="gotoDetail(h.id)"
        />
      </List>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
import HistoryDetails from '@/views/home/history/components/HistoryDetails'
import { formatTime } from '@/utils/time'
/**
 * 首页（历史消息-查看更多）模块
 * @author lyh
 * @date 2020-04-08
 */
export default {
  name: 'MoreHistory',
  components: { HistoryDetails, ModelTitle, List },
  data() {
    return {
      authorId: this.$route.query.id,
      historyData: {
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
    this.onLoad()
  },
  methods: {
    formatTime,
    gotoDetail(id) {
      return {
        path: '/detailInfo',
        query: { id: id }
      }
    },
    // 历史消息
    onLoad() {
      if (this.historyData.finished) {
        return
      }
      this.historyData.loading = true
      this.historyData.pageNumber =
        (this.historyData.data.length % this.historyData.pageSize) + 1
      this.$api.home
        .findHistoryPage({
          authorId: this.authorId,
          pageNumber: this.historyData.pageNumber,
          pageSize: this.historyData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.historyData.totalPage = res.data.totalPage
            this.historyData.data = this.historyData.data.concat(res.data.data) // 追加数据
          }
          this.historyData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.historyData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.more-history {
  width: 100%;
  height: 100%;
}
</style>
