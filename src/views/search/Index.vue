<template>
  <div class="search">
    <ModelTitle title="搜索列表" />
    <div class="content-height">
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
        >
          <div v-if="re.format === 0" class="flex justify-between items-center">
            <div class="r-c-left">
              <h3 class="truncate-3" @click="gotoDetail(re.id)">{{ re.title }}</h3>
              <div class="r-c-author"><span @click="authorClick(re.authorId)">{{ re.authorName }}</span>
                {{ re.commentNum }}
                评论 {{ formatTime(re.releaseDate) }}</div>
            </div>
            <div class="r-c-right" @click="gotoDetail(re.id)">
              <img :src="re.firstImg" alt="">
            </div>
          </div>
          <div v-if="re.format !== 0">
            <h4 class="truncate-3" @click="gotoDetail(re.id)">{{ re.title }}</h4>
            <div v-if="re.format === 3" class="r-c-img" @click="gotoDetail(re.id)">
              <img :src="re.firstImg" alt="">
            </div>
            <div v-if="re.format === 1" class="r-c-pic flex justify-between" @click="gotoDetail(re.id)">
              <img :src="re.firstImg" alt="">
              <img :src="re.secondImg" alt="">
              <img :src="re.thirdImg" alt="">
            </div>
            <div class="r-c-author"><span @click="authorClick(re.authorId)">{{ re.authorName }}</span> {{ re.commentNum }}评论 {{ formatTime(re.releaseDate) }}</div>
          </div>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
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
  components: { ModelTitle, List },
  data() {
    return {
      keyword: this.$route.query.keyword,
      columnId: this.$route.query.columnId,
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
      this.searchData.pageNumber++
      let searchMethod = 'findMediaIndex'
      if (this.columnId) {
        searchMethod = 'findMediaColumn'
      }
      this.$api.home[searchMethod]({
        columnId: this.columnId,
        keywords: this.keyword,
        pageNumber: this.searchData.pageNumber,
        pageSize: this.searchData.pageSize
      }).then(res => {
        if (res.status === 'SUCCESS') {
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
    .r-c-right{
      img {
        width: 110px;
        height: 75px;
        border-radius: 4px;
        object-fit: cover;
      }
    }
    h3{
      font-size: 16px;
      margin-bottom: 12px;
      width: 225px;
      line-height: 18px;
    }
    h4{
      font-size: 16px;
      margin-bottom: 12px;
      width: 100%;
      line-height: 18px;
    }
    .r-c-img{
      img{
        width: 100%;
        height: 194px;
        border-radius: 4px;
        object-fit: cover;
        margin-bottom: 12px;
      }
    }
    .r-c-pic{
      img{
        width: 110px;
        height: 75px;
        border-radius: 4px;
        object-fit: cover;
        margin-bottom: 12px;
      }
    }
    .r-c-author{
      color: #999999;
      font-size: 11px;
    }
}
}
</style>
