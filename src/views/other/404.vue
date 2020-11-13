<template>
  <div style="padding-top: 80px">
    <Empty
      class="custom-image"
      :image="img"
      description="哎呦！找不到你要的网页~"
    >
      <Button class="bottom-button" @click="$router.push('/')">
        回首页
      </Button>
    </Empty>
  </div>
</template>

<script>
/**
 * 404
 * @author lyh
 * @date 2020-04-16
 */
import { Empty, Button } from 'vant'
import image from '@/assets/img/404-icon.png'
export default {
  name: '404',
  components: { Empty, Button },
  data() {
    return {
      img: image
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-button {
  width: 100px;
  height: 36px;
  line-height: 36px;
  border-radius: 5px;
  border: 1px solid #333333;
}
</style>
