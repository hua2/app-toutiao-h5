<template>
  <div class="lib-modal">
    <List
      v-model="libraryListData.loading"
      :finished="libraryListData.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(re, index) in libraryListData.data"
        :key="index"
        class="recommend"
        @click="gotoDetail(re.id)"
      >
        <h4 class="truncate-3">{{ re.name }}</h4>
        <div class="r-c-img">
          <img :src="re.watermarkImage + '?x-oss-process=image/quality,q_55'" alt="">
        </div>
      </div>
    </List>
  </div>
</template>

<script>
import { List } from 'vant'
export default {
  name: 'GalleryModal',
  components: {
    List
  },
  props: {
    id: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      libraryListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 5,
        pageNumber: 0,
        totalPage: 0
      }
    }
  },
  methods: {
    onLoad() {
      if (this.libraryListData.finished) {
        return
      }
      this.libraryListData.loading = true
      this.libraryListData.pageNumber++
      this.$api.app
        .indexProduct({
          ci: this.id || '',
          psort: 0,
          keyword: this.keyword || '',
          pn: this.libraryListData.pageNumber,
          ps: this.libraryListData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.libraryListData.data = this.libraryListData.data.concat(res.data.data) // 追加数据
          }
          this.libraryListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.libraryListData.finished = true
          }
        })
    },
    gotoDetail(id) {
      this.$router.push({
        path: '/gallery/details',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.lib-modal{
  .recommend {
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
