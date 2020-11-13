<template>
  <div class="push-answer p-16">
    <ModelTitle title="视频" />
    <div>
      <Field
        v-model="form.title"
        rows="4"
        autosize
        required
        label="标题"
        maxlength="30"
        type="textarea"
        placeholder="请输入视频标题(30个字以内)"
      />
      <div class="p-a-upload flex">
        <p>添加视频</p>
        <Uploader
          ref="productPicList"
          v-model="productPicList"
          :after-read="afterRead"
          :before-read="beforeRead"
          :max-count="1"
          class="mt-16"
        />
      </div>
      <div class="flex justify-center">
        <Button size="small" class="mr-12" @click="publishDraft('1')">存草稿</Button>
        <Button size="small" @click="saveInfo('1')">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Toast, Uploader, Button } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'PublishAnswer',
  components: { ModelTitle, Field, Uploader, Button },
  data() {
    return {
      form: {
        message: '',
        videoUrl: ''
      },
      productPicList: []
    }
  },
  created() {
    // 获取 链接里的id
    if (this.id) {
      this.findOneDetail()
    }
  },
  methods: {
    // 编辑获取数据
    findOneDetail() {
      this.$api.ask.findOneDetail({ id: this.id }).then(res => {
        if (res.status === 'SUCCESS') {
          this.form = res.data
        }
      })
    },
    publishDraft(type) {
      if (this.form.title === '' || this.form.videoUrl === '') {
        Toast('请输入问题标题')
        return
      }
      const pics = this.productPicList.map(p => p.url)
      this.form.imgsList = pics.toString()
      this.$api.ask.publishDraft({
        ...this.form,
        type: type,
        uid: this.$store.state.user.userId,
        state: 0
      }).then(res => {
        if (res.status === 'SUCCESS') {
          Toast('发布成功')
          this.$router.push('/ask/draftBoxList')
        }
      })
    },
    saveInfo(type) {
      if (this.form.title === '' || this.form.videoUrl === '') {
        Toast('请输入以上内容')
        return
      }
      const pics = this.productPicList.map(p => p.url)
      this.form.videoUrl = pics
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
    },
    // 返回布尔值
    beforeRead(file) {
      if (!file.type.startsWith('video')) {
        Toast('请上传视频')
        return false
      }
      return true
    },
    afterRead(e) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '视频上传中...'
      })
      this.$api.home
        .uploadPicture(e.file, '4')
        .then(res => {
          Toast.clear()
          if (res.status === 'SUCCESS') {
            this.productPicList.push({
              url: res.data
            })
          }
          if (res.status === 'FAIL') {
            Toast('视频上传失败！')
            const fileIndex = this.productPicList.findIndex(
              a => a.file === e.file
            )
            this.productPicList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.push-answer{
  .p-a-upload{
    align-items: center;
    margin-bottom: 32px;
    p{
      color: #323233;
      font-size: 14px;
      margin-right: 8px;
    }
  }
}
</style>
