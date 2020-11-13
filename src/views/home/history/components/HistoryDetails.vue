<template>
  <div class="history-details" @click="$router.push(link)">
    <img :src="img" alt="">
    <div style="margin-left: 10px">
      <strong class="more-2">{{ title }}</strong>
      <p>{{ date }} 创建</p>
    </div>
  </div>
</template>

<script>
/**
 * 首页（文章详情-历史消息）模块
 * @author lyh
 * @date 2020-04-08
 */
export default {
  name: 'HistoryDetails',
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
  }
}
</script>

<style scoped lang="scss">
.history-details {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 12px;
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
