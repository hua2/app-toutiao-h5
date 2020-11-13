<template>
  <div>
    <ModelTitle title="入驻申请" />
    <div class="settled-page" @click="joinClick">
      <h3>供应商联盟</h3>
      <p>
        申请成为角马供应商联盟的成员，您可以发布文章、维护公司信息、上传企业产品以提高企业曝光量
      </p>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import { Toast } from 'vant'
/**
 * 首页（历史消息-入驻）模块
 * @author lyh
 * @date 2020-04-08
 */
export default {
  name: 'SettledPage',
  components: { ModelTitle },
  data() {
    return {
      alliance: {},
      status: '0'
    }
  },
  methods: {
    // 企业号申请判断状态
    joinClick() {
      this.$api.home
        .findAppUserStatus({
          appUserId: this.$store.state.user.userId
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.status = res.data.auditingStatus
            if (this.status === '0') {
              Toast('您申请的企业号正在审核，请耐心等待')
            } else if (this.status === '1') {
              Toast('此账号已关联企业号！')
            } else {
              this.$router.push('/supplier/applyEnterprise')
            }
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.settled-page {
  width: 344px;
  height: 131px;
  color: #ffffff;
  text-align: center;
  margin: 15px auto;
  padding: 32px 22px;
  background: url("../../../assets/img/settled-bg.png");
  background-size: 100% 100%;
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  p {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
