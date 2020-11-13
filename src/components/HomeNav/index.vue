<template>
  <div class="recommend-nav">
    <div class="r-n-content" @click="$router.push('/manage')">
      <img src="../../assets/img/nav-manage.png" alt="">
      <p>供应链管理</p>
    </div>
    <div class="r-n-content" @click="$router.push('/evaluate')">
      <img src="../../assets/img/nav-evaluate.png" alt="">
      <p>角马评价</p>
    </div>
    <div class="r-n-content" @click="$router.push('/operation')">
      <img src="../../assets/img/nav-operation.png" alt="">
      <p>风电运维</p>
    </div>
  </div>
</template>

<script>
/**
 * 首页（nav）模块
 * @author lyh
 * @date 2020-04-01
 */
export default {
  name: 'HomeNav'
}
</script>

<style scoped lang="scss">
.recommend-nav {
  height: 98px;
  padding: 8px 30px 11px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f2f6;
  margin-bottom: 10px;

  .r-n-content {
    img {
      width: 55px;
      height: 55px;
    }

    p {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: rgba(0, 0, 0, 1);
    }
  }
}
</style>
