<template>
  <div>
    <ModelTitle title="草稿箱" />
    <div class="content-height">
      <List
        v-model="draftBoxData.loading"
        :finished="draftBoxData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(v,index) in draftBoxData.data" :key="index" class="drafBox-list">
          <div class="p-16">
            <h3 @click="editClick(v.id, v.type)">{{ v.title }}</h3>
            <div v-if="v.imgsList && v.imgsList.length === 3" class="d-l-img">
              <div v-for="(i,indexImg) in v.imgsList" :key="indexImg">
                <img :src="i" alt="">
              </div>
            </div>
            <p>{{ formatTime(v.createDate) }} {{ v.type === 0 ?'文章':v.type === 1?'视频' :v.type === 2?'提问':'' }}</p>
          </div>
        </div>
      </List>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
import { formatTime } from '@/utils/time'
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'DraftBoxList',
  components: { ModelTitle, List },
  data() {
    return {
      draftBoxData: {
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
    formatTime,
    editClick(id, type) {
      console.log(type)
      this.$router.push({
        path: type === 0 ? '/ask/publishArticle' : type === 1 ? '/ask/publishVideo' : type === 2 ? '/ask/publishAnswer' : '',
        query: { id: id }
      })
    },
    onLoad() {
      if (this.draftBoxData.finished) {
        return
      }
      this.draftBoxData.loading = true
      this.draftBoxData.pageNumber++
      this.$api.ask
        .findPersonalPage({
          pageNumber: this.draftBoxData.pageNumber,
          pageSize: this.draftBoxData.pageSize,
          userId: this.$store.state.user.userId,
          state: 0
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            console.log(res)
            this.draftBoxData.data = this.draftBoxData.data.concat(res.data.data) // 追加数据
          }
          this.draftBoxData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.draftBoxData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.drafBox-list{
  border-bottom: 1px solid #f1f2f6;
  .d-l-img{
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    img{
      width: 110px;
      height: 75px;
    }
  }
  h3{
    font-size: 16px;
    font-weight: 500;
    color: #050505;
  }
  p{
    font-size: 8px;
    color: #797676;
    margin-top: 10px;
  }
}
</style>
