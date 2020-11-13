<template>
  <van-image
    :src="src"
    :fit="fit"
    :alt="alt"
    :round="round"
    :width="width"
    :height="height"
    :radius="radius"
    :lazy-load="lazyLoad"
    :show-error="showError"
    :show-loading="showLoading"
    @load="onLoad"
    @click="onClick"
    @error="onError"
  />
</template>

<script>
/**
 * 对vant 图片的再次封装 方便引入
 * @href https://youzan.github.io/vant/#/zh-CN/image
 * @author lyh
 */
import { Image } from 'vant'
export default {
  name: 'VanImage',
  components: {
    'van-image': Image
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    src: String,
    // eslint-disable-next-line vue/require-default-prop
    fit: String,
    // eslint-disable-next-line vue/require-default-prop
    alt: String,
    round: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    width: [Number, String],
    // eslint-disable-next-line vue/require-default-prop
    height: [Number, String],
    // eslint-disable-next-line vue/require-default-prop
    radius: [Number, String],
    lazyLoad: Boolean,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onLoad(event) {
      this.$emit('load', event)
    },

    onError(event) {
      this.$emit('error', event)
    },

    onClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped></style>
