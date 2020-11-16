/**
 * user模块接口列表
 * @author lyh
 * @date 2020-03-31
 */

import axios from '@/utils/request'
import store from '@/store'

const user = {
  // 我的意见反馈
  insertJmFeedback(data) {
    return axios.post(`/jm-comment-service/JmFeedback/insert`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 获取个人信息
  personInfo() {
    return axios.post(
      `/jm-user-service/JmAppUserCenter/findOne`,
      {},
      {
        headers: { 'jm-token': store.state.user.token },
        params: {
          id: store.state.user.userId
        }
      }
    )
  },
  // 用户信息
  personDetailsInfo(id, userId) {
    return axios.post(
      `/jm-user-service/JmAppUserCenter/findDetail`,
      {},
      {
        params: {
          id,
          userId
        }
      }
    )
  },
  // 登录
  login(data) {
    return axios.post(`/jm-user-service/JmAppUser/login`, data)
  },
  // 登录-获取验证码
  getMobileIndentifyCode(data) {
    return axios.post(
      `/jm-user-service/IdentifyCode/getMobileIndentifyCode`,
      {},
      {
        params: {
          mobile: data
        }
      }
    )
  },
  // 校验手机号验证码
  validateIndentifyCode(data) {
    return axios.post(
      `/jm-user-service/IdentifyCode/validateIndentifyCode`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 更新头像
  updateHead(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateHead`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新昵称
  updateNickName(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateNickName`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新签名
  updateSign(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateSign`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新性别
  updateGender(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateGender`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新公司信息
  updateCompany(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateCompany`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 查询行业列表
  industryFindList(data) {
    return axios.post(`/jm-industry-service//JmIndustries/findList`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更新名片
  updateCard(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateCard`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 更换手机号
  updateMobile(data) {
    return axios.post(`/jm-user-service/JmAppUserCenter/updateMobile`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 历史消息-author info
  findByAuthorId(data) {
    return axios.post(
      `/jm-business-service/JmBusinessAuthentication/findByAuthorId `,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  }
}
export default user
