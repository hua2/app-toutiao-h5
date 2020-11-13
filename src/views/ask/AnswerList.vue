<template>
  <div>
    <ModelTitle title="问题" />
    <div class="content-height">
      <List
        v-model="questionData.loading"
        :finished="questionData.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="answer-list">
          <div
            v-for="(q, index) in questionData.data"
            :key="index"
            class="a-l-list"
          >
            <h3 class="truncate-2">{{ q.title }} </h3>
            <div class="flex justify-between">
              <span>{{ q.answerNum }} 回答</span>
              <button @click="gotoDetail(q.id)">去回答</button>
            </div>
          </div>
        </div>
      </List>
    </div>
  </div></template>

<script>
import { List } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'AnswerList',
  components: { ModelTitle, List },
  data() {
    return {
      questionData: {
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
    gotoDetail(id) {
      this.$router.push({
        path: '/ask/details',
        query: { id: id }
      })
    },
    onLoad() {
      if (this.questionData.finished) {
        return
      }
      this.questionData.loading = true
      this.questionData.pageNumber++
      this.$api.ask
        .findQuestionPage({
          pageNumber: this.questionData.pageNumber,
          pageSize: this.questionData.pageSize
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            console.log(res)
            this.questionData.data = this.questionData.data.concat(res.data.data) // 追加数据
          }
          this.questionData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.questionData.finished = true
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.answer-list{
  width: 100%;
  .a-l-list {
    padding: 16px;
    border-bottom: 2px solid #f1f2f6;
    h3 {
      font-size: 16px;
      font-weight: 500;
      color: #050505;
      margin: 10px 0;
    }
    span, button {
      font-size: 8px;
      color: #797676;
      line-height: 11px;
      letter-spacing: 1px;
    }
    button {
      color: #FA2400;
      font-size: 11px;
    }
  }
}

</style>
