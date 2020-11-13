<template>
  <div class="p-h-page">
    <ModelTitle title="个人主页" />
    <div class="content-height">
      <div class="p-h-logo flex justify-between">
        <img src="../../assets/image/home-apply.png" alt="">
        <div>
          <div class="flex">
            <div><span>3</span> <p>新闻</p></div>
            <div><span>2</span> <p>关注</p></div>
            <div><span>3</span> <p>粉丝</p></div>
          </div>
          <button>关注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModelTitle from '@/components/ModelTitle/index'
export default {
  name: 'PersonalPage',
  components: { ModelTitle }
}
</script>

<style scoped lang="scss">
.p-h-page{
  width: 100%;
  .p-h-logo{
padding: 16px;
    height: 120px;
    border-bottom: 4px solid #f1f2f6;
    img{
      width: 88px;
      height: 88px;
      border-radius: 50%;
    }
    span,p{
      font-size: 11px;
      color: #797676;
    }
    button {
        color: #FA2400;
        font-size: 11px;
      }
  }
}

</style>
