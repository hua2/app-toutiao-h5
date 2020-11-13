<template>
  <div class="search">
    <ModelTitle title="资讯列表" />
    <div class="content-height">
      <List
        v-model="searchData.loading"
        :finished="searchData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ModelSearch
          v-for="(h, index) in searchData.data"
          :key="index"
          :img="h.firstImg"
          :title="h.informationTitle"
          :date="h.releaseDate"
          :link="gotoDetail(h.id)"
        />
      </List>
    </div>
  </div>
</template>

<script>
import ModelSearch from '@/views/search/components/ModelSearch'
import { formatTime } from '@/utils/time'
import { List } from 'vant'
import ModelTitle from '../../components/ModelTitle/index'
/**
 * 搜索模块
 * @author lyh
 * @date 2020-04-13
 */
export default {
  name: 'Index',
  components: { ModelTitle, ModelSearch, List },
  data() {
    return {
      keyword: this.$route.query.keyword,
      searchData: {
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
    // 搜索资讯
    onLoad() {
      if (this.searchData.finished) {
        return
      }
      this.searchData.loading = true
      this.searchData.pageNumber =
        (this.searchData.data.length % this.searchData.pageSize) + 1
      this.$api.home
        .findInfomationPage({
          keyword: this.keyword,
          pageNumber: this.searchData.pageNumber,
          pageSize: this.searchData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.searchData.totalPage = res.data.totalPage
            this.searchData.data = this.searchData.data.concat(res.data.data) // 追加数据
          }
          this.searchData.loading = false
          // 数据全部加载完成
          if (res.data === null) {
            this.searchData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 100%;
}
</style>
