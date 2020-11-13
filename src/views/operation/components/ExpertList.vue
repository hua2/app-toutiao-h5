<template>
  <List
    v-model="expertListData.loading"
    :finished="expertListData.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      v-for="(a, index) in expertListData.data"
      :key="index"
      class="operation-list"
    >
      <div class="o-l-logo">
        <img :src="a.headImg" alt="">
        <div class="o-l-info">
          <h4>
            {{ a.realName }} <span>{{ a.post }}</span>
          </h4>
          <p>公司：{{ a.companyName }}</p>
        </div>
      </div>
      <Button
        v-if="a.isAttention === 0"
        type="default"
        size="mini"
        @click="attentionExpert(index, a.id, 1)"
      >关注</Button>
      <Button
        v-else
        type="default"
        size="mini"
        @click="attentionExpert(index, a.id, 0)"
      >已关注</Button>
    </div>
  </List>
</template>

<script>
/**
 * 风电运维(首页-专家列表通用)模块
 * @author lyh
 * @date 2020-07-20
 */
import { Button, List } from 'vant'

export default {
  name: 'ExpertList',
  components: {
    Button,
    List
  },
  data() {
    return {
      keyWords: null,
      expertListData: {
        loading: false,
        finished: false,
        data: [],
        pageNumber: 0,
        pageSize: 10,
        industryId: null
      }
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    loadByIndustryId(id) {
      this.expertListData = {
        loading: false,
        finished: false,
        data: [],
        pageNumber: 0,
        pageSize: 10,
        industryId: id
      }
      this.onLoad()
    },
    reload() {
      this.expertListData = {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0,
        industryId: null
      }
      this.onLoad()
    },
    onSearch(keyWords) {
      this.keyWords = keyWords
      this.reload()
    },
    // 专家关注列表
    onLoad() {
      if (this.expertListData.finished) {
        return
      }
      this.expertListData.loading = true
      this.expertListData.pageNumber++
      this.$api.expert
        .expertsList({
          userId: this.$store.state.user.userId,
          pageNumber: this.expertListData.pageNumber,
          pageSize: this.expertListData.pageSize,
          industryId: this.expertListData.industryId,
          keyWords: this.keyWords
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.expertListData.data = this.expertListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.expertListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.expertListData.finished = true
          }
        })
    },
    // 专家关注
    attentionExpert(index, id, status) {
      this.$api.expert
        .attentionExpert({
          appUserId: this.$store.state.user.userId,
          expertId: id,
          isAttention: status
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.expertListData.data[index].isAttention = status
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.operation-list {
  width: 100%;
  height: 78px;
  padding: 12px 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f2f6;
  .o-l-logo {
    display: flex;
    align-items: center;
    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      margin-right: 22px;
    }
  }
  .o-l-info {
    max-width: 180px;
    h4 {
      color: #2d2d2d;
      font-size: 14px;
      margin-bottom: 6px;
      span {
        color: #858b93;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    p {
      color: #858b93;
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
