<template>
  <div class="agreement">
    <ModelTitle title="隐私协议" />
    <iframe src="https://www.jiaomaenergy.com/privacy.html" frameborder="0" />
  </div>
</template>

<script>
/**
 * 登录（隐私协议）模块
 * @author lyh
 * @date 2020-04-01
 */
import ModelTitle from '../../components/ModelTitle/index'
export default {
  name: 'Agreement',
  components: { ModelTitle }
}
</script>

<style scoped lang="scss">
.agreement {
  width: 100%;
  height: 100%;
}
iframe {
  width: 100%;
  height: calc(100% - 46px);
}
</style>
