<template>
  <div class="advice-page">
    <ModelTitle title="意见反馈" />
    <div class="advice-border" />
    <Field
      v-model="message"
      rows="5"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="请提出您宝贵的意见，我们将竭力改进…"
      show-word-limit
    />
    <Button type="primary" block @click="insertJmFeedback">提交</Button>
  </div>
</template>

<script>
/**
 * 我的(意见反馈)模块
 * @author lyh
 * @date 2020-03-31
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Toast, Button } from 'vant'
export default {
  name: 'AdvicePage',
  components: { ModelTitle, Field, Button },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    insertJmFeedback() {
      this.$api.user
        .insertJmFeedback({
          userId: this.$store.state.user.userId,
          content: this.message
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('反馈成功！')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.advice-page {
  width: 100%;
  height: 100%;
  background: #f1f2f6;
  .advice-border {
    border-top: 1px solid #f1f2f6;
  }
  /deep/ {
    .van-cell {
      font-size: 12px;
      background: #fff;
    }
    .van-button--primary {
      width: 305px;
      border-radius: 5px;
      margin: 24px auto;
      background-color: rgba(18, 18, 18, 1);
      border: 0.02667rem solid rgba(18, 18, 18, 1);
    }
  }
}
</style>
