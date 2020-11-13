<template>
  <List
    v-model="viewMoreData.loading"
    :finished="viewMoreData.finished"
    finished-text=""
    @load="onLoad"
  >
    <div v-for="(m, mp) in viewMoreData.data" :key="mp" class="d-p-reply">
      <span
        v-if="m.replyId === replyId"
      >{{ m.nickName }} 回复 @{{ m.toNickName }} : {{ m.content }}</span>
    </div>
  </List>
</template>

<script>
import { List } from 'vant'

export default {
  name: 'ReplyMoreList',
  components: { List },
  props: {
    replyId: {
      required: false,
      type: String,
      default: ''
    },
    parentId: {
      required: true,
      type: String,
      default: ''
    }
  },
  data() {
    return {
      viewMoreData: {
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
    onLoad() {
      if (this.viewMoreData.finished) {
        return
      }
      this.viewMoreData.loading = true
      this.viewMoreData.pageNumber++
      this.$api.expert
        .findPage({
          parentId: this.parentId,
          replyId: this.replyId,
          userId: this.$store.state.user.userId,
          pageNumber: this.viewMoreData.pageNumber,
          pageSize: this.viewMoreData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.viewMoreData.totalPage = res.data.totalPage
            this.viewMoreData.data = this.viewMoreData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.viewMoreData.loading = false
          // 数据全部加载完成
          if (res.data === null) {
            this.viewMoreData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped></style>
