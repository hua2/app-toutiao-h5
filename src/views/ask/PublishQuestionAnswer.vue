<template>
  <div class="push-article p-16">
    <ModelTitle title="回答" />
    <div>
      <QuillEditor class="mt-8" :value="form.content" @change="onEditorChange" />
      <div class="flex justify-center mt-24">
        <Button size="small" @click="saveInfo('2')">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Button } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
import QuillEditor from '@/components/Editor/QuillEditor'

export default {
  name: 'PublishQuestionAnswer',
  components: { ModelTitle, QuillEditor, Button },
  data() {
    return {
      form: {
        content: ''
      },
      pid: this.$route.query.pid
    }
  },
  created() {
  },
  methods: {
    onEditorChange(val) {
      this.form.content = val
    },
    saveInfo(type) {
      if (this.form.content === '') {
        Toast('请输入内容')
        return
      }
      this.$api.ask.publishAskMedia({
        ...this.form,
        type: type,
        pid: this.pid,
        uid: this.$store.state.user.userId
      }).then(res => {
        if (res.status === 'SUCCESS') {
          Toast('发布成功')
          this.$router.push('/ask')
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
.push-article{
    /deep/.van-button--small{
        margin-right: 12px;
    }
}
</style>
