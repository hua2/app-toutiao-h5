<template>
  <div class="model-title">
    <NavBar :title="title" left-arrow @click-left="goBack" />
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'DetailTitle',
  components: { NavBar },
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped lang="scss">
.model-title {
  width: 100%;
  /deep/ {
    .van-nav-bar .van-icon {
      color: #999999;
    }
  }
}
</style>
