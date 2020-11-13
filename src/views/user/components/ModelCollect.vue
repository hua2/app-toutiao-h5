<template>
  <div>
    <List
      v-model="cateListData.loading"
      :finished="cateListData.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="(ca, index) in cateListData.data"
        :key="index"
        class="model-collect"
        @click="gotoDetail(ca.id)"
      >
        <div v-if="ca.format === 0" class="flex justify-between items-center">
          <div class="r-c-left">
            <h3 class="truncate-3">{{ ca.title }}</h3>
            <div class="r-c-author">{{ ca.authorName }} {{ ca.commentNum }}评论 {{ formatTime(ca.releaseDate) }}</div>
          </div>
          <div class="r-c-right">
            <img :src="ca.firstImg" alt="">
          </div>
        </div>
        <div v-if="ca.format !== 0">
          <h4 class="truncate-3">{{ ca.title }}</h4>
          <div v-if="ca.format === 3" class="r-c-img">
            <img :src="ca.firstImg" alt="">
          </div>
          <div v-if="ca.format === 1" class="r-c-pic flex justify-between">
            <img :src="ca.firstImg" alt="">
            <img :src="ca.secondImg" alt="">
            <img :src="ca.thirdImg" alt="">
          </div>
          <div class="r-c-author">角马能源 0评论 1小时前</div>
        </div>
      </div>
    </List>
  </div>
</template>

<script>
/**
 * 我的(我的收藏-内容通用)模块
 * @author lyh
 * @date 2020-04-02
 */
import { List } from 'vant'
import { formatTime } from '@/utils/time'
export default {
  name: 'ModelCollect',
  components: { List },
  data() {
    return {
      cateListData: {
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
    // 收藏资讯 视频
    onLoad() {
      if (this.cateListData.finished) {
        return
      }
      this.cateListData.loading = true
      this.cateListData.pageNumber++
      this.$api.ask
        .findCollectPage({
          userId: this.$store.state.user.userId,
          pageNumber: this.cateListData.pageNumber,
          pageSize: this.cateListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.cateListData.data = this.cateListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.cateListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.cateListData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.model-collect {
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
</style>
