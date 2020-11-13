<template>
  <div class="member-page">
    <ModelTitle title="会员中心" />
    <div class="m-p-content content-height">
      <div class="m-p-card">
        <div><img :src="account.headPicUrl" alt=""></div>
        <strong class="more-1">{{ account.nickName }}</strong>
        <div class="m-p-member">
          <img src="../../assets/img/head-icon.png" alt="">
          <span>黑卡会员</span>
        </div>
        <div class="m-p-serve">
          会员服务
        </div>
      </div>
      <div class="m-p-time">
        <h3>会员时长</h3>
        <div>
          <div class="m-p-info">
            <div class="m-p-i-time">
              <p>包月</p>
              <span>会员有效期为30天</span>
            </div>
            <div class="m-p-i-price">
              ¥12
            </div>
          </div>
          <div class="m-p-border" />
        </div>
        <div class="mt-24">
          <div class="m-p-info">
            <div class="m-p-i-time">
              <p>包季</p>
              <span>会员有效期为90天</span>
            </div>
            <div class="m-p-i-price">
              ¥28
            </div>
          </div>
          <div class="m-p-border" />
        </div>
        <div class="mt-24">
          <div class="m-p-info">
            <div class="m-p-i-time">
              <p>包年</p>
              <span>会员有效期为365天</span>
            </div>
            <div class="m-p-i-price">
              ¥98
            </div>
          </div>
          <div class="m-p-border" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
/**
 * 我的（会员中心）模块
 * @author lyh
 * @date 2020-03-30
 */
export default {
  name: 'MemberPage',
  components: { ModelTitle },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  }
}
</script>

<style scoped lang="scss">
.member-page {
  width: 100%;
  height: 100%;
  color: #ffffff;
  .m-p-content {
    width: 100%;
    padding: 20px 16px 0 16px;
    background: url("../../assets/img/user-member.png");
    background-size: 100% 100%;
  }
  .mt-24 {
    margin-top: 24px;
  }
  .m-p-card {
    width: 345px;
    height: 131px;
    padding: 24px 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    background: url("../../assets/img/user-member-card.png");
    background-size: 100% 100%;
    img {
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 50%;
      object-fit: cover;
    }
    strong {
      font-size: 20px;
      font-weight: 600;
      max-width: 100px;
    }
    .m-p-member {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #eaca98;
      margin-top: 8px;
      img {
        width: 11px;
        height: 11px;
      }
    }
    .m-p-serve {
      font-size: 11px;
      color: #d2b170;
      margin-top: 12px;
      width: 60px;
      height: 23px;
      line-height: 23px;
      text-align: center;
      background: rgba(45, 45, 45, 1);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.37);
      border-radius: 12px;
    }
  }
  .m-p-time {
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-top: 32px;
      color: rgba(153, 153, 153, 1);
    }
    .m-p-info {
      display: flex;
      align-items: center;
      padding: 16px 0 8px 16px;
      justify-content: space-between;
      .m-p-i-time {
        p {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        span {
          font-size: 11px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          letter-spacing: 2px;
        }
      }
      .m-p-i-price {
        font-size: 24px;
        font-weight: 600;
        color: rgba(210, 177, 112, 1);
        letter-spacing: 2px;
      }
    }
  }
  .m-p-border {
    width: 100%;
    height: 4px;
    background: url("../../assets/img/line-icon.png");
  }
}
</style>
