<template>
  <div class="login">
    <ModelTitle title="登录" />
    <div class="login-content">
      <img src="../../assets/img/logo.png" alt="">
      <div class="l-c-iphone">
        <Form>
          <Field
            v-model="mobile"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
            ]"
          />
        </Form>
        <Field
          v-model="identifyCode"
          center
          clearable
          label="短信验证码"
          :disabled="mobile === ''"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <span v-if="showTimer"> {{ count }}s </span>
            <Button
              v-else
              size="small"
              type="primary"
              :disabled="mobile === ''"
              @click="getCode"
            >获取验证码</Button>
          </template>
        </Field>
        <div class="l-c-btn">
          <Button
            type="primary"
            block
            :disabled="mobile === '' || identifyCode === ''"
            :loading="isLoading"
            @click="loginClick"
          >登录</Button>
        </div>
        <div class="l-c-notice">
          <p>
            未注册的手机号登录时将自动注册，且代表您已同意
            <router-link to="/login/userPage">用户协议</router-link>和
            <router-link to="/login/userPage">隐私政策</router-link>
            <!--            <router-link to="/login/agreement">隐私政策</router-link>-->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 登录模块
 * @author lyh
 * @date 2020-03-31
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Button, Toast, Form } from 'vant'
export default {
  name: 'Index',
  components: { ModelTitle, Field, Button, Form },
  data() {
    return {
      mobile: '',
      identifyCode: '',
      showTimer: false,
      timer: null,
      count: 0,
      redirect: this.$route.query.redirect,
      isLoading: false
    }
  },
  watch: {
    $route(val) {
      this.redirect = val.query && val.query.redirect
    }
  },
  methods: {
    loginClick() {
      this.isLoading = true
      this.$api.user
        .login({
          mobile: this.mobile,
          identifyCode: this.identifyCode
        })
        .then(res => {
          this.isLoading = false
          if (res.status === 'SUCCESS') {
            if (res.data.token) {
              const data = res.data.token
              const userId = res.data.id
              this.$store.commit('setToken', {
                token: data,
                userId: userId
              })
              this.$store.dispatch('getLoginUserDate')
            }
            Toast('登录成功！')
            this.$router.push({ path: this.redirect || '/' })
          } else {
            // 失败 提示
            Toast(res.msg)
          }
        })
    },
    getCode() {
      this.getMobileIndentifyCode()
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
    },
    getMobileIndentifyCode() {
      this.$api.user.getMobileIndentifyCode(this.mobile).then(res => {
        if (res.status === 'SUCCESS') {
          Toast('验证码发送成功，请注意查收！')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .login-content {
    margin-top: 52px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      margin: 0 auto;
    }
    .l-c-iphone {
      padding: 16px;
      .l-c-btn {
        /deep/ {
          .van-button--primary {
            width: 320px;
            height: 48px;
            border-radius: 8px;
            margin: 32px auto;
            background-color: rgba(18, 18, 18, 1);
            border: 0.02667rem solid rgba(18, 18, 18, 1);
          }
        }
      }
      .l-c-notice {
        padding: 0 12px;
        font-size: 12px;
        color: #d8d8d8;
        text-align: center;
        a {
          color: #b5bace;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
