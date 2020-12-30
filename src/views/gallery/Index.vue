<template>
  <div class="library">
    <div class="home-header">
      <div class="home-search">
        <Search
          v-model="keyword"
          disabled-s
          shape="round"
          placeholder="搜索"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <Tabs v-model="active" sticky>
        <Tab title="推荐">
          <GalleryAllModal />
        </Tab>
        <Tab
          v-for="(l, index) in libraryData"
          :key="index"
          :title="l.title"
          :name="l.id"
        >
          <GalleryModal :id="l.id" />
        </Tab>
      </Tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Toast, Search, Tabs, Tab } from 'vant'
import GalleryModal from '@/views/gallery/components/GalleryModal'
import GalleryAllModal from '@/views/gallery/components/GalleryAllModal'
import Footer from '@/components/Footer/index'

export default {
  name: 'Index',
  components: { Footer, GalleryAllModal, GalleryModal, Search, Tabs, Tab },
  data() {
    return {
      active: 0,
      keyword: '',
      libraryData: []
    }
  },
  created() {
    this.hideList()
  },
  methods: {
    // 图库tab
    hideList() {
      this.$api.app.hideList().then(res => {
        if (res.code === 1000) {
          this.libraryData = res.data
        }
      })
    },
    onSearch(val) {
      // const column = this.libraryData[this.active - 1]
      const column = this.active
      this.$router.push({
        path: '/search/gallery',
        query: { keyword: val, id: column || null }
      })
    },
    onCancel(val) {
      Toast(val)
    }
  }
}
</script>

<style scoped lang="scss">
.library{
  width: 100%;
  height: 100%;
  overflow: hidden;
  /deep/{
    .van-tabs__line {
      z-index: 100;
      background-color: #000000;
    }
  }
  .home-header {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
    // 隐藏 滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
