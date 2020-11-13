<template>
  <div class="user">
    <ModelTitle title="个人中心" />
    <div class="except-tabbar-height">
      <div class="user-header">
        <div class="user-info">
          <div @click="$router.push('/user/personal')">
            <img :src="account.headPicUrl" alt="">
          </div>
          <div class="u-i-grade">
            <div style="display: flex">
              <strong class="more-1">{{ account.nickName }}</strong>
            </div>

          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="u-i-title" @click="$router.push('/user/collectPage')">
          <img src="../../assets/img/heart-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>我的收藏</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-title" @click="$router.push('/user/attentionPage')">
          <img src="../../assets/img/heart-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>我的关注</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-title" @click="$router.push('/user/personalPage')">
          <img src="../../assets/img/heart-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>个人主页</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-title" @click="$router.push('/ask/draftBoxList')">
          <img src="../../assets/img/heart-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>草稿箱</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-border" />
        <div class="u-i-title" @click="$router.push('/user/aboutPage')">
          <img src="../../assets/img/about-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>关于我们</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-title" @click="$router.push('/user/advicePage')">
          <img src="../../assets/img/advice-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>意见反馈</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
        <div class="u-i-title" @click="$router.push('/user/settingPage')">
          <img src="../../assets/img/setting-icon.png" alt="">
          <div class="u-i-t-icon">
            <p>设置</p>
            <img src="../../assets/img/back-right.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import Footer from '@/components/Footer/index'
/**
 * 我的模块
 * @author lyh
 * @date 2020-03-30
 */
export default {
  name: 'Index',
  components: { Footer, ModelTitle },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    account() {
      return this.$store.state.user.account
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  width: 100%;
  height: 100%;
  .user-header {
    width: 100%;
    height: 200px;
    position: relative;
    color: #ffffff;
    background: url("../../assets/img/user-header.png");
    background-size: 100% 100%;
    .user-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 16px;
      bottom: 6px;
      img {
        width: 101px;
        height: 101px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
      }
      .u-i-grade {
        margin: 0 0 12px 16px;
        span {
          height: 15px;
          line-height: 15px;
          text-align: center;
          font-size: 11px;
          font-weight: 400;
          margin: 8px 0 0 8px;
          color: rgba(255, 255, 255, 1);
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 1);
        }
        p {
          display: flex;
          align-items: center;
          font-size: 11px;
          font-weight: 400;
          color: rgba(210, 177, 112, 1);
          img {
            width: 11px;
            height: 11px;
            margin-right: 4px;
          }
        }
      }
      strong {
        font-size: 18px;
        font-weight: 600;
        /*max-width: 90px;*/
      }
      .u-i-member {
        width: 82px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        font-size: 11px;
        margin: 0 0 12px 22px;
        background: rgba(210, 177, 112, 0.6);
        border-radius: 13px;
        color: #ffffff;
      }
    }
  }
  .user-info {
    .u-i-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 0 0 0 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      img {
        width: 32px;
        height: 32px;
      }
      .u-i-t-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 330px;
        border-bottom: 1px solid #dbdbdb;
        p {
          margin-left: 10px;
          padding: 16px 0;
        }
        img {
          width: 8px;
          height: 14px;
          margin-right: 14px;
        }
      }
    }
    .u-i-border {
      width: 375px;
      height: 8px;
      background: rgba(241, 242, 246, 1);
    }
  }
}
</style>
