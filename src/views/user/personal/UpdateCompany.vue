<template>
  <div class="update-company">
    <ModelTitle title="公司信息" />
    <div class="update-border" />
    <img
      src="../../../assets/img/submit-icon.png"
      alt=""
      @click="updateCompany"
    >
    <div class="update-content content-height">
      <Field
        v-model="companyName"
        rows="1"
        autosize
        label="公司名称"
        type="textarea"
        placeholder="请输入公司名称"
      />
      <Field
        readonly
        clickable
        name="picker"
        :value="value"
        label="所属行业"
        placeholder="点击选择行业"
        @click="showPicker = true"
      />
      <Popup v-model="showPicker" position="bottom">
        <Picker
          show-toolbar
          :columns="industryName"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </Popup>
      <Field
        v-model="post"
        rows="1"
        autosize
        label="职务"
        type="textarea"
        placeholder="请输入职务"
      />
    </div>
  </div>
</template>

<script>
/**
 * 我的(更改公司信息)模块
 * @author lyh
 * @date 2020-04-09
 */
import ModelTitle from '@/components/ModelTitle/index'
import { Field, Popup, Picker, Toast } from 'vant'
export default {
  name: 'UpdateCompany',
  components: { ModelTitle, Field, Popup, Picker },
  data() {
    return {
      companyName: this.$store.state.user.account.companyName,
      post: this.$store.state.user.account.post,
      value: this.$store.state.user.account.industry,
      industryData: [],
      industryName: [],
      showPicker: false
    }
  },
  created() {
    this.industryFindList()
  },
  methods: {
    // 查询行业列表
    industryFindList() {
      this.$api.user.industryFindList({}).then(res => {
        if (res.status === 'SUCCESS') {
          this.industryData = res.data
          const name = this.industryData.map(na => na.name)
          this.industryName = name
        }
      })
    },
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
    // 更新公司信息
    updateCompany() {
      if (this.companyName === '') {
        Toast('公司名称不能为空！')
        return
      }
      if (this.value === '') {
        Toast('所属行业不能为空！')
        return
      }
      if (this.post === '') {
        Toast('职务不能为空！')
        return
      }
      this.$api.user
        .updateCompany({
          id: this.$store.state.user.userId,
          companyName: this.companyName,
          post: this.post,
          industry: this.value
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$store.dispatch('getLoginUserDate')
            this.$router.push('/user/personal')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.update-company {
  width: 100%;
  height: 100%;
  img {
    width: 20px;
    height: 14px;
    position: absolute;
    top: 16px;
    right: 14px;
    z-index: 1;
  }
  .update-border {
    border-top: 1px solid #f1f2f6;
  }
  .update-content {
    background: #f1f2f6;
  }
}
</style>
