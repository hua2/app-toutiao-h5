<template>
  <div class="model-search" @click="$router.push(link)">
    <div style="margin-right: 10px">
      <strong class="more-2">{{ title }}</strong>
      <p>{{ convertToShowDate(date) }}</p>
    </div>
    <img :src="img" alt="">
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'

/**
 * 首页（搜索通用模块）模块
 * @author lyh
 * @date 2020-04-13
 */
export default {
  name: 'ModelSearch',
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    date: {
      required: true,
      type: String,
      default: ''
    },
    img: {
      required: true,
      type: String,
      default: ''
    },
    link: {
      required: true,
      type: Object
    }
  },
  methods: {
    convertToShowDate(time) {
      if (!time || time === '') {
        return ''
      }
      const date = new Date(time)
      return formatTime(date.getTime())
    }
  }
}
</script>

<style scoped lang="scss">
.model-search {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f2f6;
  img {
    width: 122px;
    height: 65px;
    object-fit: cover;
  }
  strong {
    width: 211px;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
  }
  p {
    width: 211px;
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(158, 158, 158, 1);
    line-height: 17px;
    margin-top: 8px;
  }
}
</style>
