<template>
  <div class="push-article p-16">
    <ModelTitle title="文章" />
    <div>
      <Field
        v-model="form.title"
        autosize
        required
        label="标题"
        maxlength="30"
        type="text"
        placeholder="请输入问题(30个字以内)"
      />
      <QuillEditor class="mt-8" @change="onEditorChange" />
      <div class="flex justify-center">
        <Button size="small" @click="publishDraft('0')">存草稿</Button>
        <Button size="small" @click="saveInfo('0')">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Toast, Button } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
import QuillEditor from '@/components/Editor/QuillEditor'

export default {
  name: 'PublishArticle',
  components: { ModelTitle, Field, QuillEditor, Button },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      id: this.$route.query.id
    }
  },
  created() {
    // 获取 链接里的id
    if (this.id) {
      this.findOneDetail()
    }
  },
  methods: {
    onEditorChange(val) {
      this.form.content = val
    },
    // 编辑获取数据
    findOneDetail() {
    },
    publishDraft(type) {
      if (this.form.title === '' || this.form.content === '') {
        Toast('请输入以上内容')
        return
      }
      if (!this.id) {
        this.$api.ask.publishDraft({
          ...this.form,
          type: type,
          uid: this.$store.state.user.userId,
          state: 0
        }).then(res => {
          if (res.status === 'SUCCESS') {
            this.$router.push('/ask/draftBoxList')
          }
        })
      } else {
        this.$api.ask.publishDraft({
          ...this.form,
          type: type,
          uid: this.$store.state.user.userId,
          state: 0,
          id: this.id
        }).then(res => {
          if (res.status === 'SUCCESS') {
            Toast('修改成功')
            this.$router.push('/ask/draftBoxList')
          }
        })
      }
    },
    saveInfo(type) {
      if (this.form.title === '' || this.form.content === '') {
        Toast('请输入以上内容')
        return
      }
      this.$api.ask.publishAskMedia({
        ...this.form,
        type: type,
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
