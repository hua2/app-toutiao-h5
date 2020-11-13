<template>
  <div class="recommend">
    <Tabs v-model="active">
      <Tab title="全部">
        <OperationRecommendList ref="operationRecommendList" />
      </Tab>
      <Tab
        v-for="(tab, index) in tabData"
        :key="index"
        :title="tab.name"
        :name="tab.name"
        :disabled="keyWords !== null"
      >
        <OperationRecommendList :id="tab.id" />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import OperationRecommendList from '@/views/operation/recommend/components/OperationRecommendList'

/**
 * 风电运维(推荐)模块
 * @author lyh
 * @date 2020-07-13
 */
export default {
  name: 'OperationRecommend',
  components: { OperationRecommendList, Tab, Tabs },
  data() {
    return {
      active: 0,
      tabData: [],
      keyWords: null
    }
  },
  created() {
    this.findListIndustries()
  },
  methods: {
    onSearch(keyWords) {
      this.keyWords = keyWords
      this.active = 0
      this.$refs.operationRecommendList.onSearch(keyWords)
    },
    findListIndustries() {
      this.$api.expert.findListIndustries().then(res => {
        if (res.status === 'SUCCESS') {
          this.tabData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend {
  width: 100%;
}
</style>
