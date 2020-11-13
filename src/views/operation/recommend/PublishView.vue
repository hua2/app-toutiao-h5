<template>
  <div class="publish-view">
    <ModelTitle title="发布观点" />
    <div class="p-v-content content-height">
      <Button
        size="small"
        @click="onPublishClick"
      >发布</Button>
      <input
        v-model="message.title"
        type="text"
        placeholder="起个响亮的标题～"
      >
      <field
        v-model="message.content"
        style="margin-top:6px"
        rows="2"
        autosize
        type="textarea"
        placeholder="分享观点，表达自我，20字以上内容更吸引关注哦～"
      />
      <div class="p-v-main">
        <template v-for="(o, i) in otherList">
          <p v-if="o.state === 0" :key="i">{{ o.content }}</p>
          <img v-if="o.state === 1" :key="i" :src="o.content">
          <video
            v-if="o.state === 2"
            :key="i"
            :src="o.content"
            autoplay="false"
            muted
            controls
          />
        </template>
      </div>
      <Field
        v-if="showText"
        v-model="message.text"
        style="margin-top:6px"
        rows="2"
        autosize
        type="textarea"
        placeholder="请输入文字内容"
      />
      <input
        ref="fileImage"
        type="file"
        accept="image/*"
        style="display:none"
        @change="handleFileImageChange"
      >
      <input
        ref="fileVideo"
        type="file"
        accept="video/*"
        style="display:none"
        @change="handleFileVideoChange"
      >
      <Field
        readonly
        clickable
        name="picker"
        :value="industryName"
        label="所属行业"
        placeholder="点击选择行业"
        @click="showPicker = true"
      />
      <Popup v-model="showPicker" position="bottom">
        <Picker
          show-toolbar
          :columns="industryData"
          value-key="name"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </Popup>
      <img
        v-if="!showBtn"
        class="p-v-insert"
        src="../../../assets/img/add-btn.png"
        alt=""
        @click="onInsertClick"
      >
      <div v-else class="p-v-pic">
        <img
          src="../../../assets/img/img-btn.png"
          alt=""
          @click="$refs.fileImage.click()"
        >
        <img
          src="../../../assets/img/video-btn.png"
          alt=""
          @click="$refs.fileVideo.click()"
        >
        <img
          src="../../../assets/img/text-btn.png"
          alt=""
          @click="onShowTextClick"
        >
      </div>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Toast, Button, Popup, Picker } from 'vant'
export default {
  name: 'PublishView',
  components: { ModelTitle, Field, Button, Popup, Picker },
  data() {
    return {
      message: {
        title: '',
        content: '',
        text: ''
      },
      otherList: [],
      showBtn: false,
      showText: false,
      showPicker: false,
      industryName: '',
      industryId: '',
      industryData: []
    }
  },
  created() {
    this.industryFindList()
  },
  methods: {
    // 查询行业列表
    industryFindList() {
      this.$api.expert.findListIndustries().then(res => {
        if (res.status === 'SUCCESS') {
          this.industryData = res.data
        }
      })
    },
    onConfirm(value) {
      this.industryName = value.name
      this.industryId = value.id
      this.showPicker = false
    },
    onInsertClick() {
      if (this.message.text && this.message.text !== '') {
        this.otherList.push({
          state: 0,
          content: this.message.text
        })
        this.message.text = ''
      }
      this.showText = false
      this.showBtn = true
    },
    onShowTextClick() {
      this.showText = true
      this.message.text = ''
      this.showBtn = false
    },
    handleFileImageChange(e) {
      const files = e.target.files
      if (!files || files.length === 0) {
        return
      }
      const file = files[0]
      if (!file.type.startsWith('image')) {
        Toast('请上传图片')
        return
      }
      this.uploadFile(file)
    },
    handleFileVideoChange(e) {
      const files = e.target.files
      if (!files || files.length === 0) {
        return
      }
      const file = files[0]
      if (!file.type.startsWith('video')) {
        Toast('请上传视频')
        return
      }
      this.uploadFile(file, true)
    },
    uploadFile(file, isVideo = false) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '上传中...'
      })
      this.$api.home
        .uploadPicture(file, '1')
        .then(res => {
          Toast.clear()
          if (res.status === 'FAIL') {
            Toast('上传失败！')
            return
          }
          if (res.status === 'SUCCESS') {
            this.otherList.push({
              state: isVideo ? 2 : 1,
              content: res.data
            })

            this.showBtn = false
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    onPublishClick() {
      if (this.message.title === '' && this.message.content === '' && this.industryName === '') {
        Toast('请填写下列内容')
        return
      }
      this.onInsertClick()
      this.showBtn = false
      this.$api.expert
        .insertViewpoint({
          createBy: this.$store.state.user.userId,
          title: this.message.title,
          content: this.message.content,
          otherList: this.otherList,
          industryName: this.industryName,
          industryId: this.industryId
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast(res.msg)
            this.$router.push('/operation')
          }
          if (res.data === 2) {
            Toast(res.msg)
            this.$router.push('/expert')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.publish-view {
  width: 100%;
  height: 100%;
  position: relative;
  .p-v-content {
    padding: 8px;
    font-size: 12px;
    button {
      position: absolute;
      top: 6px;
      right: 12px;
      height: 36px;
      z-index: 99;
      border: unset;
    }
    .p-v-main {
      margin-top: 6px;
      /deep/ {
        p {
          word-break: break-all;
        }
        video {
          width: 100%;
        }
        img {
          width: 100%;
          height: auto;
        }
      }
    }
    /deep/ {
      .van-cell {
        font-size: 12px;
        padding: unset;
      }
    }
    input {
      width: 100%;
      display: block;
      padding: 8px 0;
      border-bottom: 1px solid #f1f2f6;
    }
    ::placeholder {
      color: #858282;
    }
    img {
      width: 33px;
      height: 33px;
      margin: 32px auto;
    }
    .p-v-insert {
      -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
      animation: fadein 1s;
    }
    .p-v-pic {
      display: flex;
      -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
      animation: fadein 1s;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
