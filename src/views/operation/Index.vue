<template>
  <div class="operation">
    <ModelTitle title="问答" />
    <div class="except-tabbar-height">
      <div v-if="showPublish" class="operation-create" @click="$router.push('recommend/publishView')">
        <img src="../../assets/img/publish-icon.png" alt="">
      </div>
      <div class="operation-search">
        <Search
          v-model="keyword"
          :class="isSearching ? 'show-search' : ''"
          disabled-s
          shape="round"
          placeholder="搜索"
          @search="onSearch"
          @cancel="onCancel"
        />
        <Button
          type="primary"
          size="mini"
          :icon="isSearching ? 'cross' : 'search'"
          @click="handleChangeSearch"
        />
      </div>
      <Tabs v-model="active" sticky @change="onChangeClick">
        <Tab title="关注">
          <AttentionList ref="attentionList" />
        </Tab>
        <Tab>
          <template slot="title">
            <DropdownMenu v-if="show" active-color="#000000">
              <DropdownItem
                ref="expertlItem"
                :title="expertl[expertlActive].name"
              >
                <Cell
                  v-for="(ex, i) in expertl"
                  :key="i"
                  :title="ex.name"
                  :class="expertlActive === i ? 'active' : ''"
                  is-link
                  @click="onCellClick(i)"
                >
                  <template #icon>
                    <img class="cell-icon" :src="ex.picUrl">
                  </template>
                </Cell>
              </DropdownItem>
            </DropdownMenu>
            <span v-else @click="findListIndustries">{{
              expertl[expertlActive].name
            }}</span>
          </template>

          <ExpertList ref="expertList" />
        </Tab>
        <Tab title="推荐">
          <OperationRecommend ref="operationRecommend" />
        </Tab>
      </Tabs>
    </div>
    <Footer />
  </div>
</template>

<script>
/**
 * 风电运维模块
 * @author lyh
 * @date 2020-06-28
 */
import ModelTitle from '@/components/ModelTitle/index'
import {
  Tab,
  Tabs,
  Cell,
  DropdownMenu,
  Search,
  Button,
  DropdownItem
} from 'vant'
import OperationRecommend from '@/views/operation/Recommend'
import ExpertList from '@/views/operation/components/ExpertList'
import AttentionList from '@/views/operation/components/AttentionList'
import Footer from '@/components/Footer/index'
export default {
  name: 'Index',
  components: {
    Footer,
    AttentionList,
    ExpertList,
    OperationRecommend,
    ModelTitle,
    Tab,
    Button,
    Tabs,
    Search,
    Cell,
    DropdownMenu,
    DropdownItem
  },
  data() {
    return {
      show: false,
      showPublish: false,
      active: 0,
      expertlActive: 0,
      isSearching: false,
      keyword: '',
      expertl: [
        {
          id: null,
          name: '专家',
          picUrl: require('../../assets/img/nav-manage.png')
        }
      ],
      id: this.$store.state.user.account.id
    }
  },
  created() {
  },
  methods: {
    handleChangeSearch() {
      this.isSearching = !this.isSearching
      if (!this.isSearching) {
        this.keyword = null
        this.onSearch(null)
      }
    },
    onSearch(val) {
      if (this.active === 0) {
        this.$refs.attentionList.onSearch(val)
      }
      if (this.active === 1) {
        this.expertlActive = 0
        this.$refs.expertList.onSearch(val)
      }
      if (this.active === 2) {
        this.$refs.operationRecommend.onSearch(val)
      }
    },
    onCancel() {
      this.onSearch(null)
    },
    onChangeClick(name) {
      this.isSearching = false
      this.keyword = null
      if (name === 1) {
        this.show = true
      } else {
        this.show = false
      }
      if (name === 2) {
        this.showPublish = true
      } else {
        this.showPublish = false
      }
    },
    onCellClick(index) {
      const ex = this.expertl[index]
      this.$refs.expertList.loadByIndustryId(ex.id)
      this.expertlActive = index
      // 关闭下拉
      this.$refs.expertlItem.toggle()
    },
    // 分类栏目
    findListIndustries() {
      this.$api.expert.findListIndustries().then(res => {
        if (res.status === 'SUCCESS') {
          this.expertl = [
            {
              id: null,
              name: '专家',
              picUrl: require('../../assets/img/nav-manage.png')
            },
            ...res.data
          ]
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.operation {
  width: 100%;
  height: 100%;
  .operation-search {
    display: none;
    position: absolute;
    top: 6px;
    z-index: 99;
    left: 40px;
    width: calc(100% - 60px);
    height: 36px;
    .van-search {
      width: 0;
      opacity: 0;
      padding: 1px 60px 0 0;
      transition: all 0.5s;
    }
    .van-button--primary {
      color: unset;
      background-color: unset;
      border: unset;
    }
    .show-search {
      width: 100%;
      opacity: 1;
    }
    .van-button {
      width: 40px;
      position: absolute;
      top: 6px;
      right: 0;
    }
  }
  .operation-create {
    width: 100%;
    cursor: pointer;
    img {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 15px;
      right: 12px;
      z-index: 99;
    }
  }
  .van-dropdown-menu {
    min-width: 6em;
    .van-cell {
      height: 55px;
      line-height: 35px;
      .cell-icon {
        width: 35px;
        height: 35px;
        margin-right: 12px;
      }
      .van-cell__right-icon {
        height: 35px;
        line-height: 35px;
      }
      &.active {
        color: #000;
        font-weight: bold;
      }
    }
  }

  /deep/ {
    .van-tabs {
      height: 100%;
    }

    .van-tabs__content {
      height: calc(100% - 60px);
    }
    .van-tabs__line {
      z-index: 100;
      background-color: #000000;
    }
    .van-dropdown-menu__title {
      font-size: 14px;
      margin-bottom: 6px;
    }
  }
}
</style>
