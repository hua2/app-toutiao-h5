<template>
  <div class="personal">
    <ModelTitle title="个人信息" />
    <div class="personal-content content-height">
      <CellGroup>
        <Cell is-link value="修改头像" @click="uploadLogo()">
          <template #title>
            <img
              :src="account.headPicUrl"
              alt=""
              style="width: 24px;height: 24px"
            >
          </template>
        </Cell>
        <div class="apply-logo">
          <Uploader
            ref="picUploader"
            v-model="logoList"
            :after-read="afterLogoRead"
            :before-read="beforeRead"
            :max-count="1"
          />
        </div>
        <Cell
          title="昵称"
          is-link
          :value="account.nickName"
          @click="$router.push('/user/personal/updateNickName')"
        />
        <Cell
          title="签名"
          is-link
          :value="account.sign"
          @click="$router.push('/user/personal/updateSign')"
        />
        <Field
          readonly
          clickable
          label="性别"
          placeholder="点击选择性别"
          input-align="right"
          right-icon="arrow"
          name="picker"
          :value="account.gender === 1 ? '男' : '女'"
          @click="showPicker = true"
        />
        <Popup v-model="showPicker" position="bottom">
          <Picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </Popup>
      </CellGroup>
      <CellGroup style="margin-top: 8px">
        <Cell
          title="公司信息"
          is-link
          :value="account.companyName"
          @click="$router.push('/user/personal/updateCompany')"
        />
        <Cell title="行业" :value="account.industry" />
        <Cell title="职务" :value="account.post" />
        <Cell title="名片" is-link @click="uploadCard()">
          <template v-if="account.cardPicUrl !== null" #right-icon>
            <img
              :src="account.cardPicUrl"
              alt=""
              style="width: 24px;height: 24px"
            >
          </template>
        </Cell>
        <div class="apply-logo">
          <Uploader
            ref="cardUploader"
            v-model="cardList"
            :after-read="afterCardRead"
            :before-read="beforeRead"
            :max-count="1"
          />
        </div>
      </CellGroup>
      <CellGroup style="margin-top: 8px">
        <Cell
          title="我的手机号"
          is-link
          :value="account.mobile"
          @click="$router.push('/user/personal/updateMobile')"
        />
      </CellGroup>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import { Uploader, Toast, Cell, CellGroup, Field, Popup, Picker } from 'vant'
export default {
  name: 'Personal',
  components: { ModelTitle, Uploader, Cell, CellGroup, Field, Popup, Picker },
  data() {
    return {
      logoList: [],
      cardList: [], // 名片
      form: {
        headPicUrl: '',
        cardPicUrl: ''
      },
      value: '',
      columns: ['男', '女'], // 1男 2女
      showPicker: false
    }
  },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  },
  methods: {
    // 更新性别
    onConfirm(value) {
      this.value = value
      this.showPicker = false
      this.$api.user
        .updateGender({
          id: this.$store.state.user.userId,
          gender: value === '女' ? '2' : '1'
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            Toast('修改成功！')
            this.$store.dispatch('getLoginUserDate')
          }
        })
    },
    // 更新头像
    uploadLogo() {
      if (this.logoList.length > 0) {
        this.logoList = []
      }
      this.$refs.picUploader.chooseFile()
    },
    // 返回布尔值
    beforeRead(file) {
      if (!file.type.startsWith('image')) {
        Toast('请上传图片')
        return false
      }
      return true
    },
    afterLogoRead(e) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '图片上传中...'
      })
      this.$api.home
        .uploadPicture(e.file, '1')
        .then(res => {
          Toast.clear()
          if (res.status === 'SUCCESS') {
            this.form.headPicUrl = res.data
            this.updateHead()
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.logoList.findIndex(a => a.file === e.file)
            this.logoList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    // 更新头像
    updateHead() {
      this.$api.user
        .updateHead({
          id: this.$store.state.user.userId,
          headPicUrl: this.form.headPicUrl
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$store.dispatch('getLoginUserDate')
          }
        })
    },
    // 更新名片
    uploadCard() {
      if (this.logoList.length > 0) {
        this.cardList = []
      }
      this.$refs.cardUploader.chooseFile()
    },
    // 更新名片
    afterCardRead(e) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: '图片上传中...'
      })
      this.$api.home
        .uploadPicture(e.file, '1')
        .then(res => {
          Toast.clear()
          if (res.status === 'SUCCESS') {
            this.form.cardPicUrl = res.data
            this.updateCard()
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.cardList.findIndex(a => a.file === e.file)
            this.cardList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    // 更新名片
    updateCard() {
      this.$api.user
        .updateCard({
          id: this.$store.state.user.userId,
          cardPicUrl: this.form.cardPicUrl
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$store.dispatch('getLoginUserDate')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.personal {
  width: 100%;
  height: 100%;
  .personal-content {
    background: #f1f2f6;
    .apply-logo {
      /deep/ {
        .van-uploader {
          display: none;
        }
      }
    }
  }
}
</style>
