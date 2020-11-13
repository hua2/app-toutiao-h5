<template>
  <div id="app" :class="isWeixin ? 'weixin' : ''">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    const weixin =
      window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    return {
      isWeixin: weixin
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #ffffff;
  -webkit-overflow-scrolling: touch;
}
</style>
