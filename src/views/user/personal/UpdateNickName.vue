<template>
  <div class="update-nickname">
    <ModelTitle title="昵称" />
    <div class="update-border" />
    <img
      src="../../../assets/img/submit-icon.png"
      alt=""
      @click="updateNickName"
    >
    <div class="content-height" style="background: #f1f2f6;">
      <Field
        v-model="message"
        rows="1"
        autosize
        clearable
        label="昵称"
        type="textarea"
        placeholder="请输入昵称"
      />
    </div>
  </div>
</template>

<script>
/**
 * 我的(更改昵称)模块
 * @author lyh
 * @date 2020-04-09
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Toast } from 'vant'
export default {
  name: 'UpdateNickName',
  components: { ModelTitle, Field },
  data() {
    return {
      message: this.$store.state.user.account.nickName
    }
  },
  methods: {
    // 更新昵称
    updateNickName() {
      if (this.message === '') {
        Toast('昵称不能为空！')
        return
      }
      this.$api.user
        .updateNickName({
          id: this.$store.state.user.userId,
          nickName: this.message
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
.update-nickname {
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
}
</style>
