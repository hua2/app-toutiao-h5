<template>
  <div class="update-sign">
    <ModelTitle title="签名" />
    <div class="update-border" />
    <img src="../../../assets/img/submit-icon.png" alt="" @click="updateSign">
    <div class="update-content content-height">
      <Field
        v-model="message"
        rows="4"
        label="签名"
        type="textarea"
        placeholder="请输入签名"
        maxlength="30"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
/**
 * 我的(更改签名)模块
 * @author lyh
 * @date 2020-04-09
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Toast } from 'vant'
export default {
  name: 'UpdateSign',
  components: { ModelTitle, Field },
  data() {
    return {
      message: this.$store.state.user.account.sign
    }
  },
  methods: {
    // 更新签名
    updateSign() {
      if (this.message === '') {
        Toast('请输入符合规范的内容！')
        return
      }
      this.$api.user
        .updateSign({
          id: this.$store.state.user.userId,
          sign: this.message
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.message = ''
            this.$store.dispatch('getLoginUserDate')
            this.$router.push('/user/personal')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.update-sign {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 20px;
    height: 14px;
    position: absolute;
    top: 16px;
    right: 14px;
    z-index: 1;
  }
  .update-border {
    border-top: 1px solid #f1f2f6;
  }
  .update-content {
    background: #f1f2f6;
  }
}
</style>
