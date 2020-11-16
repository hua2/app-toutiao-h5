<template>
  <div class="push-answer p-16">
    <ModelTitle title="提问" />
    <div>
      <Field
        v-model="form.title"
        rows="4"
        autosize
        required
        label="标题"
        maxlength="30"
        type="textarea"
        placeholder="请输入问题(30个字以内)"
      />
      <div class="p-a-upload flex">
        <p>添加配图</p>
        <Uploader
          v-model="productPicList"
          :max-count="3"
          :before-read="beforeRead"
          :after-read="afterRead"
          class="mt-16"
        />
      </div>
      <div class="flex justify-center">
        <Button size="small" @click="publishDraft('2')">存草稿</Button>
        <Button size="small" @click="saveInfo('2')">发布</Button>
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
        title: '',
        imgsList: []
      },
      productPicList: [],
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
    // 编辑获取数据
    findOneDetail() {
      this.$api.ask.findOneDetail({ id: this.id }).then(res => {
        if (res.status === 'SUCCESS') {
          this.form = res.data
          if (this.form.imgsList) {
            const pics = this.form.imgsList
            this.productPicList = pics.map(p => {
              return {
                url: p
              }
            })
          }
        }
      })
    },
    // 发布 编辑草稿箱
    publishDraft(type) {
      if (this.form.title === '') {
        Toast('请输入标题')
        return
      }
      const pics = this.productPicList.map(p => p.url)
      this.form.imgsList = pics
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
      if (this.form.title === '') {
        Toast('请输入标题')
        return
      }
      const pics = this.productPicList.map(p => p.url)
      this.form.imgsList = pics
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
      if (!file.type.startsWith('image')) {
        Toast('请上传图片')
        return false
      }
      return true
    },
    afterRead(e) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '图片上传中...'
      })
      this.$api.home
        .uploadPicture(e.file, '4')
        .then(res => {
          Toast.clear()
          const fileIndex = this.productPicList.findIndex(
            a => a.file === e.file
          )
          if (res.status === 'SUCCESS') {
            this.productPicList[fileIndex].url = res.data
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
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
/deep/.van-button--small{
    margin-right: 12px;
}
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
