<template>
  <div class="collect-page">
    <ModelTitle title="我的收藏" />
    <div class="content-height">
      <ModelCollect />
    </div>
  </div>
</template>

<script>
/**
 * 我的(我的收藏)模块
 * @author lyh
 * @date 2020-04-02
 */
import ModelTitle from '@/components/ModelTitle/index'
import ModelCollect from '@/views/user/components/ModelCollect'

export default {
  name: 'CollectPage',
  components: { ModelCollect, ModelTitle },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.collect-page {
  width: 100%;
  height: 100%;
  /deep/{
    .van-tabs__line {
      z-index: 100;
      background-color: #000000;
    }
  }
}
</style>
