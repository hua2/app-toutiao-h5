<template>
  <div>
    <ModelTitle title="关于我们" />
    <div class="about-page">
      <img src="../../assets/img/logo.png" alt="">
      <p>北京角马能源科技有限公司</p>
      <div class="a-p-info">
        <p>客服电话：010-53561109</p>
        <p>客服邮箱：kefu@jm.energy</p>
        <p>公众号：JM_energy</p>
      </div>
      <div class="a-p-content">
        <p>
          角马能源致力于成为中国领先的能源和环保产业物资采购管理和供应链优化服务商。
        </p>
        <p>
          我们旨在赋能企业，依托在行业内积累多年的权威专家资源、
          物资采购管理高端论坛、企业客户、垂直媒体，通过互联网、大数据、新金融等技术、产品和服务为能源和环保企业提供端到端的供需解决方案，
          降低成本，提高效率。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
/**
 * 我的(关于我们)模块
 * @author lyh
 * @date 2020-03-31
 */
export default {
  name: 'AboutPage',
  components: { ModelTitle }
}
</script>

<style scoped lang="scss">
.about-page {
  padding: 36px 24px;
  text-align: center;
  img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    object-fit: cover;
  }
  p {
    margin-top: 16px;
    font-weight: 600;
    font-size: 18px;
  }
  .a-p-info {
    margin: 8px 0 12px;
    p {
      margin-top: unset;
      margin-bottom: 8px;
      font-weight: 400;
      font-size: 14px;
    }
  }
  .a-p-content {
    p {
      text-indent: 16px;
      letter-spacing: 1px;
      text-align: justify;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
