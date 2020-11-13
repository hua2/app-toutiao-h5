<template>
  <div class="setting-page">
    <button @click="exitLogout">退出登录</button>
  </div>
</template>

<script>
/**
 * 我的(设置)模块
 * @author lyh
 * @date 2020-03-31
 */

export default {
  name: 'SettingPage',
  methods: {
    // 退出登录
    exitLogout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.setting-page {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  button {
    font-size: 16px;
    color: #ff3940;
  }
}
</style>
