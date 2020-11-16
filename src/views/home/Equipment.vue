<template>
  <div class="re_recommend">
    <List
      v-model="cateListData.loading"
      :finished="cateListData.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="recommend">
        <div
          v-for="(re, index) in cateListData.data"
          :key="index"
          class="recommend-common"
        >
          <div v-if="re.format === 0" class="flex justify-between items-center">
            <div class="r-c-left">
              <h3 class="truncate-3" @click="gotoDetail(re.id)">{{ re.title }}</h3>
              <div class="r-c-author"><span @click="authorClick(re.authorId)">{{ re.authorName }}</span> {{ re.commentNum }}评论 {{ formatTime(re.releaseDate) }}</div>
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
      </div>
    </List>
  </div>
</template>

<script>
/**
 * 首页(Tab切换通用）模块
 * @author lyh
 * @date 2020-04-01
 */
import { List } from 'vant'
import { formatTime } from '@/utils/time'

export default {
  name: 'Equipment',
  components: { List },
  props: {
    id: {
      required: true,
      type: Number,
      default: 0
    }
  },
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
  created() {
    this.onLoad()
  },
  methods: {
    authorClick(id) {
      this.$router.push({
        path: '/user/personalPage',
        query: { id: id }
      })
    },
    gotoDetail(id) {
      this.$router.push({
        path: '/detailInfo',
        query: { id: id }
      })
    },
    formatTime,
    // 首页分类内容
    onLoad() {
      if (this.cateListData.finished) {
        return
      }
      this.cateListData.loading = true
      this.cateListData.pageNumber++
      this.$api.home
        .findMediaColumn({
          columnId: this.id,
          pageNumber: this.cateListData.pageNumber,
          pageSize: this.cateListData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.cateListData.data = this.cateListData.data.concat(res.data.data) // 追加数据
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
  .re_recommend {
    .recommend-common{
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
