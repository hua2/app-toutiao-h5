<template>
  <div class="apply">
    <ModelTitle title="申请" />
    <div class="apply-content content-height">
      <Field
        v-model="form.userName"
        required
        label="姓名"
        placeholder="请输入申请人姓名"
      />
      <Form>
        <Field
          v-model="form.phone"
          required
          :rules="[
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
          ]"
          type="phone"
          label="电话"
          placeholder="请输入申请人电话"
        />
        <Field
          v-model="form.weixinId"
          label="微信"
          placeholder="请输入申请人微信"
        />
        <Field
          v-model="form.email"
          label="邮箱"
          placeholder="请输入申请人邮箱"
          :rules="[
            { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误！'}
          ]"
        />
      </Form>
      <div class="apply-card apply-require">
        <p>身份证号</p>
        <div class="a-c-upload">
          <Uploader
            v-model="aptitudeFaceList"
            :before-read="beforeRead"
            :after-read="afterReadFace"
            :max-count="1"
          >
            <img src="../../assets/img/card-id.png" alt="">
          </Uploader>
          <Uploader
            v-model="aptitudeBackList"
            :before-read="beforeRead"
            :after-read="afterReadBack"
            :max-count="1"
          >
            <img src="../../assets/img/card-id-back.png" alt="">
          </Uploader>
        </div>
      </div>
      <Field
        v-model="form.businessName"
        required
        label="公司名称"
        placeholder="请输入公司名称"
      />
      <Cell
        title="LOGO"
        is-link
        required
        :value="form.logoImg && form.logoImg.length > 0 ? '已上传' : ''"
        @click="uploadLogo()"
      />
      <div class="apply-logo">
        <Uploader
          ref="logoUploader"
          v-model="aptitudeLogoList"
          :after-read="afterLogoRead"
          :before-read="beforeRead"
          :max-count="1"
        />
      </div>
      <div class="apply-info info-require">
        <p>介绍</p>
        <textarea v-model="form.introduce" placeholder="请输入" />
      </div>
      <div class="apply-license info-require">
        <p>营业执照</p>
        <Uploader
          v-model="aptitudeList"
          :before-read="beforeRead"
          :after-read="afterRead"
          :max-count="9"
          @delete="afterDelete"
        />
      </div>
      <Button
        type="primary"
        block
        :disabled="
          form.userName === '' ||
            form.phone === '' ||
            form.businessName === '' ||
            form.introduce === '' ||
            aptitudeFaceList.length === 0 ||
            aptitudeBackList.length === 0 ||
            aptitudeLogoList.length === 0 ||
            aptitudeList.length === 0
        "
        @click="applyClick"
      >
        立即申请</Button>
    </div>
  </div>
</template>

<script>
import { Field, Uploader, Toast, Button, Cell, Form } from 'vant'
import ModelTitle from '@/components/ModelTitle/index'

export default {
  name: 'RegisteredPage',
  components: { ModelTitle, Field, Button, Uploader, Cell, Form },
  data() {
    return {
      form: {
        userName: '',
        phone: '',
        weixinId: '',
        email: '',
        idCardFace: '', // 身份证正面图片链接
        idCardBack: '', // 身份证背面图片
        businessName: '',
        logoImg: '', // logo
        introduce: '',
        aptitudeOne: '', // 资质1
        aptitudeTwo: '', // 资质2
        aptitudeThree: '', // 资质3
        aptitudeFour: '', // 资质4
        aptitudeFive: '', // 资质5
        aptitudeSix: '', // 资质6
        aptitudeSeven: '', // 资质7
        aptitudeEight: '', // 资质8
        aptitudeNine: '' // 资质9
      },
      aptitudeFaceList: [],
      aptitudeBackList: [],
      aptitudeLogoList: [],
      aptitudeList: [],
      aptitudeSaveList: [],
      type: 1, // 企业号申请
      show: false
    }
  },
  created() {},
  methods: {
    uploadLogo() {
      if (this.aptitudeLogoList.length > 0) {
        this.aptitudeLogoList = []
      }
      this.$refs.logoUploader.chooseFile()
    },
    // 返回布尔值
    beforeRead(file) {
      if (!file.type.startsWith('image')) {
        Toast('请上传图片')
        return false
      }
      return true
    },
    afterReadFace(e) {
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
            this.form.idCardFace = res.data
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.aptitudeFaceList.findIndex(
              a => a.file === e.file
            )
            this.aptitudeFaceList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    afterReadBack(e) {
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
            this.form.idCardBack = res.data
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.aptitudeBackList.findIndex(
              a => a.file === e.file
            )
            this.aptitudeBackList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
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
            this.form.logoImg = res.data
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.aptitudeLogoList.findIndex(
              a => a.file === e.file
            )
            this.aptitudeLogoList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    afterRead(e) {
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
            this.aptitudeSaveList.push({
              file: e.file,
              url: res.data
            })
          }
          if (res.status === 'FAIL') {
            Toast('图片上传失败！')
            const fileIndex = this.aptitudeList.findIndex(
              a => a.file === e.file
            )
            this.aptitudeList.splice(fileIndex, 1)
          }
        })
        .catch(() => {
          Toast.clear()
        })
    },
    afterDelete(e) {
      const fileIndex = this.aptitudeSaveList.findIndex(a => a.file === e.file)
      this.aptitudeSaveList.splice(fileIndex, 1)
    },
    // 企业号申请
    applyClick() {
      this.aptitudeSaveList.forEach((a, index) => {
        switch (index) {
          case 0:
            this.form.aptitudeOne = a.url
            break
          case 1:
            this.form.aptitudeTwo = a.url
            break
          case 2:
            this.form.aptitudeThree = a.url
            break
          case 3:
            this.form.aptitudeFour = a.url
            break
          case 4:
            this.form.aptitudeFive = a.url
            break
          case 5:
            this.form.aptitudeSix = a.url
            break
          case 6:
            this.form.aptitudeSeven = a.url
            break
          case 7:
            this.form.aptitudeEight = a.url
            break
          case 8:
            this.form.aptitudeNine = a.url
            break
        }
      })
      this.$api.home
        .insertBusinessApply({
          ...this.form,
          type: this.type,
          appUserId: this.$store.state.user.userId
        })
        .then(res => {
          if (res.code === 200) {
            this.$router.push({
              path: '/other/successLink',
              query: { phone: this.form.phone }
            })
          } else {
            // 失败 提示
            Toast(res.message)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
    .apply {
        width: 100%;
        height: 100%;
        /deep/ {
            .van-button--primary {
                background-color: rgba(18, 18, 18, 1);
                border: 0.02667rem solid rgba(18, 18, 18, 1);
            }
        }
        .apply-content {
            padding: 8px;
            p {
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
            }
            textarea {
                width: 338px;
                height: 56px;
                background: #f1f2f6;
                margin-top: 12px;
                padding: 6px;
                font-size: 14px;
            }

            .apply-card {
                width: 343px;
                margin-left: 8px;
                padding: 12px 0;
                border-bottom: 2px solid #f1f2f6;
                img {
                    width: 94px;
                    height: 64px;
                    object-fit: cover;
                }
                .a-c-upload {
                    display: flex;
                    margin-top: 16px;
                    justify-content: space-around;
                    /deep/ {
                        .van-uploader__upload {
                            width: 94px;
                            height: 64px;
                            margin: 0;
                        }
                        .van-uploader__preview-delete {
                            font-size: 14px;
                        }
                        .van-uploader__preview-image {
                            width: 94px;
                            height: 64px;
                        }
                    }
                }
            }
          .apply-require{
            padding-left: 8px;
            position: relative;
            &:before {
              position: absolute;
              left: 0;
              top: 16px;
              color: #ee0a24;
              font-size: 12px;
              content: "*";
            }
          }
            .apply-logo {
                /deep/ {
                    .van-uploader {
                        display: none;
                    }
                }
            }
          .info-require{
            padding-left: 8px;
            position: relative;
            &:before {
              position: absolute;
              left: 8px;
              top: 0;
              color: #ee0a24;
              font-size: 12px;
              content: "*";
            }
          }
            .apply-info {
                padding-left: 16px;
                margin-top: 16px;
            }
            .apply-license {
                padding: 0 16px 12px 16px;
                /deep/ {
                    .van-field__label {
                        width: 68px;
                    }
                    .van-uploader__upload {
                        width: 78px;
                        height: 78px;
                        margin: 0;
                    }
                    .van-uploader__preview-delete {
                        font-size: 14px;
                    }
                    .van-uploader__preview {
                        margin-right: 24px;
                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                    }
                    .van-uploader__preview-image {
                        width: 78px;
                        height: 78px;
                    }
                }
                p {
                    margin: 12px 0;
                }
            }
        }
    }
</style>
