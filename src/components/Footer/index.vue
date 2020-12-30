<template>
  <div class="home-footer">
    <Tabbar
      v-model="active"
      route
      active-color="#000000"
      inactive-color="#999999"
    >
      <TabbarItem
        replace
        to="/"
      ><span>首页</span>
        <template #icon="props">
          <img
            v-if="props.active"
            src="../../assets/img/home-index-active.png"
          >
          <img v-else src="../../assets/img/home-index.png">
        </template>
      </TabbarItem>
      <TabbarItem replace to="/ask">
        <span>问答</span>
        <template #icon="props">
          <img v-if="props.active" src="../../assets/img/home-ask-active.png">
          <img v-else src="../../assets/img/home-ask.png">
        </template>
      </TabbarItem>
      <TabbarItem replace to="/gallery">
        <span>图库</span>
        <template #icon="props">
          <img v-if="props.active" src="../../assets/image/home-tuku-active.png">
          <img v-else src="../../assets/image/home-tuku.png">
        </template>
      </TabbarItem>
      <TabbarItem replace to="/video">
        <span>视频</span>
        <template #icon="props">
          <img v-if="props.active" src="../../assets/img/home-video-active.png">
          <img v-else src="../../assets/img/home-video.png">
        </template>
      </TabbarItem>
      <TabbarItem replace to="/user">
        <span>我的</span>
        <template #icon="props">
          <img
            v-if="props.active"
            src="../../assets/img/home-user-active.png"
          >
          <img v-else src="../../assets/img/home-user.png">
        </template>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
/**
 * 首页（footer）模块
 * @author lyh
 * @date 2020-04-01
 */
export default {
  name: 'Footer',
  components: { Tabbar, TabbarItem },
  data() {
    return {
      active: null
    }
  },
  methods: {
    goIndex() {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped lang="scss">
.home-footer {
  width: 100%;
  height: 50px;
  /deep/ {
    .van-tabbar--fixed {
      position: relative;
    }
  }
}
</style>
