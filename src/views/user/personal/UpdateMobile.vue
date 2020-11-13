<template>
  <div class="update-mobile">
    <ModelTitle title="绑定手机号" />
    <template v-if="active === 0">
      <div class="update-content content-height">
        <p>您正在更换的手机号：{{ account.mobile }} 请验证</p>
        <Field
          v-model="identifyCode"
          name="identifyCode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <span v-if="showTimer"> {{ count }}s </span>
            <Button
              v-else
              size="small"
              type="primary"
              @click="getCode(account.mobile)"
            >获取验证码</Button>
          </template>
        </Field>
        <div class="update-btn">
          <Button
            type="primary"
            block
            :loading="isLoadingOld"
            @click="confirmOldClick(account.mobile)"
          >确定</Button>
        </div>
      </div>
    </template>
    <template v-if="active === 1">
      <div class="update-content">
        <p>请输入新手机号，并进行验证</p>
        <Form>
          <Field
            v-model="newMobile"
            label="手机号"
            center
            clearable
            type="tel"
            name="newMobile"
            placeholder="请输入手机号"
            :rules="[
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
            ]"
          >
            <template #button />
          </Field>
        </Form>
        <Field
          v-model="identifyCode"
          center
          name="newIdentifyCode"
          clearable
          label="短信验证码"
          :disabled="newMobile === ''"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <span v-if="showTimer"> {{ count }}s </span>
            <Button
              v-else
              size="small"
              type="primary"
              :disabled="newMobile === ''"
              @click="getCode(newMobile)"
            >获取验证码</Button>
          </template>
        </Field>
        <div class="update-btn">
          <Button
            type="primary"
            block
            :disabled="identifyCode === '' || newMobile === ''"
            :loading="isLoadingNew"
            @click="confirmNewClick()"
          >确定</Button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/**
 * 我的(更改手机号)模块
 * @author lyh
 * @date 2020-04-09
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Button, Toast, Form } from 'vant'
export default {
  name: 'UpdateMobile',
  components: { ModelTitle, Field, Button, Form },
  data() {
    return {
      mobile: '',
      identifyCode: '',
      showTimer: false,
      timer: null,
      count: 0,
      newMobile: '',
      active: 0,
      isLoadingOld: false,
      isLoadingNew: false
    }
  },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.showTimer = false
    }
  },
  methods: {
    // 获取验证码
    getMobileIndentifyCode(mobile) {
      return new Promise((resolve, reject) => {
        this.$api.user
          .getMobileIndentifyCode(mobile)
          .then(res => {
            if (res.status === 'SUCCESS') {
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 校验手机号验证码
    validateIndentifyCode(mobile) {
      return new Promise((resolve, reject) => {
        this.$api.user
          .validateIndentifyCode({
            mobile,
            identifyCode: this.identifyCode
          })
          .then(res => {
            if (res.status === 'SUCCESS') {
              resolve(true)
            }
            if (res.status === 'FAIL') {
              resolve(false)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    confirmOldClick(mobile) {
      this.isLoadingOld = true
      this.validateIndentifyCode(mobile).then(res => {
        this.isLoadingOld = false
        if (res) {
          this.active = 1
          this.identifyCode = ''
          if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
            this.showTimer = false
          }
        } else {
          Toast('验证码错误！')
        }
      })
    },
    confirmNewClick() {
      this.isLoadingNew = true
      this.$api.user
        .updateMobile({
          id: this.$store.state.user.userId,
          mobile: this.newMobile,
          identifyCode: this.identifyCode
        })
        .then(res => {
          this.isLoadingNew = false
          if (res.status === 'SUCCESS') {
            Toast('修改成功，请重新登录！')
            if (this.timer) {
              clearInterval(this.timer)
              this.timer = null
              this.showTimer = false
            }
            this.$store.commit('logout')
            this.$router.push('/login')
          }
          if (res.status === 'FAIL') {
            Toast('验证码错误！')
          }
        })
    },
    getCode(mobile) {
      this.getMobileIndentifyCode(mobile).then(res => {
        if (res) {
          Toast('验证码发送成功，请注意查收！')
          this.showTimeCountDown()
        }
      })
    },
    showTimeCountDown() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.showTimer = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.showTimer = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.update-mobile {
  width: 100%;
  height: 100%;
  .update-content {
    background: #f1f2f6;
    /deep/ {
      .van-button--primary {
        color: #2d2d2d;
        background-color: #fff;
        border: 0.02667rem solid #ffffff;
      }
    }
    p {
      text-align: center;
      font-size: 14px;
      color: rgba(252, 113, 115, 1);
      margin: 24px 0 18px 0;
    }
    .update-btn {
      /deep/ {
        .van-button--primary {
          width: 305px;
          margin: 44px auto 0;
          border-radius: 5px;
          color: #ffffff;
          background-color: rgba(18, 18, 18, 1);
          border: 0.02667rem solid rgba(18, 18, 18, 1);
        }
      }
    }
  }
}
</style>
