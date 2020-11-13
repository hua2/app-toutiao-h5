<template>
  <div class="apply-success">
    <ModelTitle title="申请结果" />
    <img src="../../assets/img/apply-success.png" alt="">
    <p>注册成功</p>
    <p>您的用户名：{{ phone }}</p>
    <p>发布信息请登录 <a href="javascript;"> 角马业务中台 </a>
      <button ref="copyButton" :data-clipboard-text="copyLink">复制</button>
    </p>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
import Clipboard from 'clipboard'
import { Toast } from 'vant'
/**
 * 企业号申请（成功跳转业务中台）模块
 * @author lyh
 * @date 2020-09-07
 */
export default {
  name: 'SuccessLink',
  components: { ModelTitle },
  data() {
    return {
      phone: this.$route.query.phone,
      copyLink: 'http://jms.jiaomaenergy.com/'

    }
  },
  mounted() {
    this.initClipboard()
  },
  methods: {
    initClipboard() {
      const clipboard = new Clipboard(this.$refs.copyButton)
      clipboard.on('success', (e) => {
        Toast('复制成功，请在浏览器中打开')
      })
      clipboard.on('error', (e) => {
        Toast('复制失败，请再次尝试')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.apply-success {
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    margin: 132px auto 0 auto;
  }
  p {
    font-size: 14px;
    margin-top: 25px;
    color: rgba(144, 144, 144, 1);
    button{
      color: #1890ff;
    }
  }
}
</style>
