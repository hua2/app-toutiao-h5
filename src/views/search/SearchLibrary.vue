<template>
  <div class="search">
    <List
      v-model="searchData.loading"
      :finished="searchData.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(re, index) in searchData.data"
        :key="index"
        class="search-list"
        @click="gotoDetail(re.id)"
      >
        <div>
          <h4 class="truncate-3">{{ re.name }}</h4>
          <div class="r-c-img">
            <img :src="re.watermarkImage" alt="">
          </div>
        </div>
      </div>
    </List>
  </div>
</template>

<script>
import { List } from 'vant'
/**
 * 搜索(app-tuku)模块
 * @author lyh
 * @date 2020-12-30
 */
export default {
  name: 'SearchLibrary',
  components: { List },
  data() {
    return {
      keyword: '',
      id: '',
      searchData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 5,
        pageNumber: 0,
        totalPage: 0
      }
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.id = this.$route.query.id
    if (this.keyword || this.columnId) {
      this.onLoad()
    }
  },
  methods: {
    gotoDetail(id) {
      this.$router.push({
        path: '/library/details',
        query: { id: id }
      })
    },
    // 搜索
    onLoad() {
      if (this.searchData.finished) {
        return
      }
      this.searchData.loading = true
      this.searchData.pageNumber++
      this.$api.app.indexProduct({
        ci: this.id || '',
        psort: 0,
        keyword: this.keyword,
        pn: this.searchData.pageNumber,
        ps: this.searchData.pageSize
      }).then(res => {
        if (res.code === 1000) {
          this.searchData.totalPage = res.data.totalPage
          this.searchData.data = this.searchData.data.concat(res.data.data) // 追加数据
        }
        this.searchData.loading = false
        // 数据全部加载完成
        if (res.data === null || res.data.data.length === 0) {
          this.searchData.finished = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search{
  width: 100%;
  height: 100%;
.search-list {
    width: 100%;
    padding: 16px;
    margin-bottom: 10px;
    border-bottom: 1px solid #f1f2f6;
  h4{
    font-size: 16px;
    margin-bottom: 12px;
    width: 100%;
    line-height: 18px;
  }
  .r-c-img{
    img{
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
    }
  }

}
}
</style>
