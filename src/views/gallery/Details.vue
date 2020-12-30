<template>
  <div class="lib-details">
    <DetailTitle :title="details.name" />
    <div class="content-height p-16">
      <div class="l-d-info">
        <img
          :src="details.watermarkImage + '?x-oss-process=image/quality,q_55'"
          alt=""
        >
        <h4>基本信息</h4>
        <div>
          <p>
            <span class="d-c-title">ID:</span>
            <span>{{ details.code }}</span>
          </p>
          <p>
            <span class="d-c-title">作者/来源：</span>
            <span>{{ details.authorName }}</span>
          </p>
          <p>
            <span class="d-c-title">最大尺寸：</span>
            <span>{{ details.width }} x {{ details.height }} </span>
          </p>
          <p>
            <span class="d-c-title">格式：</span>
            <span>{{ details.format }}</span>
          </p>
          <p>
            <span class="d-c-title">介绍：</span>
            <span>{{ details.introduce }}</span>
          </p>
          <p>
            <span class="d-c-title">第三方权力说明：</span>
            <span>{{ details.rightExplain }}</span>
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <Button type="info" size="small" @click="downloadClick">
          图片下载
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Dialog } from 'vant'
import DetailTitle from '@/views/home/components/DetailTitle'
export default {
  name: 'Details',
  components: {
    DetailTitle,
    Button
  },
  data() {
    return {
      id: '',
      details: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    downloadClick() {
      Dialog.alert({
        message: '请前往能源图库网站下载图片' + '<p style="color: #2b6cb0;margin-top: 8px">http://tuku.jiaomaenergy.com/</p>'
      }).then(() => {
        // on close
      })
    },
    // 获取图片详情
    getDetail() {
      this.$api.app.getDetail({ id: this.id }).then(res => {
        if (res.code === 1000) {
          this.details = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.lib-details{
  width: 100%;
  height: 100%;
  .l-d-info{
      width: 100%;
    margin-bottom: 12px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-bottom: 12px;
    }
    h4{
      font-size: 16px;
    }
      p {
        font-size: 12px;
        line-height: 1.6;
        color: #666;
        display: flex;
        padding: 3px 3px 3px 0;
        .d-c-title {
          min-width: 100px;
          white-space: nowrap;
        }
      }
  }
}

</style>
