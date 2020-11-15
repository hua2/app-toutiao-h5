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
        <template v-if="form.videoUrl">
          <video :src="form.videoUrl" muted controls />
          <Icon name="cross" @click="form.videoUrl=''" />
        </template>
        <template v-else>
          <Button :loading="isVideoUpload" type="info" loading-text="上传中..." @click="handleVideoFileClick">上传视频</Button>
          <input ref="videoFile" type="file" hidden @change="onVideoFileRead">
        </template>
      </div>
      <div class="flex justify-center">
        <Button size="small" @click="publishDraft('1')">存草稿</Button>
        <Button size="small" @click="saveInfo('1')">发布</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Toast, Button, Icon } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'PublishAnswer',
  components: { ModelTitle, Field, Button, Icon },
  data() {
    return {
      form: {
        message: '',
        videoUrl: ''
      },
      isVideoUpload: false,
      id: this.$route.query.id,
      productVideoList: []
    }
  },
  created() {
    // 获取 链接里的id
    if (this.id) {
      this.findOneDetail()
    }
  },
  methods: {
    previewVideo(e) {
      this.$refs.previewVideo.src = e.url
      this.showPreviewVideo = true
    },
    // 编辑获取数据
    findOneDetail() {
      this.$api.ask.findOneDetail({ id: this.id }).then(res => {
        if (res.status === 'SUCCESS') {
          this.form = res.data
          this.productVideoList = [{
            url: this.form.videoUrl
          }]
        }
      })
    },
    publishDraft(type) {
      if (this.form.title === '' || this.form.videoUrl === '') {
        Toast('请输入问题标题')
        return
      }
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
    handleVideoFileClick() {
      this.$refs.videoFile.click()
    },
    onVideoFileRead(e) {
      const files = e.target.files || []
      const file = files[0]
      if (!file || !file.type.startsWith('video')) {
        Toast('请上传视频')
      }
      Toast.loading({
        duration: 0,
        mask: true,
        message: '视频上传中...'
      })
      this.$api.home
        .uploadPicture(file, '4')
        .then(res => {
          Toast.clear()
          if (res.status === 'SUCCESS') {
            this.form.videoUrl = res.data
          }
          if (res.status === 'FAIL') {
            Toast('视频上传失败！')
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
  /deep/.van-button--small{
    margin-right: 12px;
}
  .p-a-upload{
    align-items: center;
    margin-bottom: 32px;
    position: relative;
    p{
      color: #323233;
      font-size: 14px;
      margin-right: 8px;
      min-width: 90px;
    }
    .van-button,video{
      margin-top: 12px;
    }
    video{
      margin-top: 12px;
      width: calc(100% - 98px);
    }

    .van-icon{
      position: absolute;
      right: 0;
      top: 12px;
      font-size: 12px;
      padding: 2px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 12px;
      color: #fff;
    }
  }
}
</style>
