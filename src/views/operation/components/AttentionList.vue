<template>
  <List
    v-model="attentionListData.loading"
    :finished="attentionListData.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      v-for="(a, index) in attentionListData.data"
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
 * 风电运维(首页-通用)模块
 * @author lyh
 * @date 2020-07-09
 */
import { Button, List } from 'vant'

export default {
  name: 'AttentionList',
  components: {
    Button,
    List
  },
  data() {
    return {
      attentionListData: {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0
      },
      keyWords: null
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    reload() {
      this.attentionListData = {
        loading: false,
        finished: false,
        data: [],
        pageSize: 10,
        pageNumber: 0
      }
      this.onLoad()
    },
    onSearch(keyWords) {
      this.keyWords = keyWords
      this.reload()
    },
    // 专家关注列表
    onLoad() {
      if (this.attentionListData.finished) {
        return
      }
      this.attentionListData.loading = true
      this.attentionListData.pageNumber++
      this.$api.expert
        .findAttentionPage({
          userId: this.$store.state.user.userId,
          pageNumber: this.attentionListData.pageNumber,
          pageSize: this.attentionListData.pageSize,
          keyWords: this.keyWords
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.attentionListData.data = this.attentionListData.data.concat(
              res.data.data
            ) // 追加数据
          }
          this.attentionListData.loading = false
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.attentionListData.finished = true
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
            this.attentionListData.data[index].isAttention = status
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
