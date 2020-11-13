/**
 * expert模块接口列表
 * @author lyh
 * @date 2020-07-20
 */

import axios from '@/utils/request'
import store from '@/store'

const expert = {
  // 专家关注列表
  findAttentionPage(data) {
    return axios.post(`/jm-expert-service/JmOmExpert/findAttentionPage`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 专家关注
  attentionExpert(data) {
    return axios.post(`/jm-expert-service/JmOmExpert/attention`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 分类栏目
  findListIndustries() {
    return axios.post(`/jm-expert-service/JmOmIndustries/findList`, {}, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 专家详情
  findExpertDetail(params) {
    return axios.get(`/jm-expert-service/JmOmExpert/findDetail`, {
      params: params,
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 专家列表
  expertsList(params) {
    return axios.get(`/jm-expert-service/JmOmExpert/experts`, {
      params: params,
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 推荐观点/个人详情列表
  findViewPointBeanPage(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpoint/findViewPointBeanPage`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 推荐观点-详情
  findDetail(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpoint/findDetail`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 推荐观点-评论列表
  findPage(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpointComment/findPage`,
      data
    )
  },
  // 推荐观点评论发布
  publishComment(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpointComment/publishComment`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 推荐观点-点赞
  praiseInfo(data) {
    return axios.post(`/jm-expert-service/JmOmExpertViewpoint/praise`, data)
  },
  // 推荐观点-评论-点赞 (评论列表的点赞)
  praiseComment(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpointComment/praise`,
      data
    )
  },
  // 推荐观点-删除 (评论列表的删除)
  deleteComment(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpointComment/delete`,
      data
    )
  },
  // 专家认证
  insertExpert(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpert/insert`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 专家主信息（修改）
  updateExpert(params) {
    return axios.get(
      `/jm-expert-service/JmOmExpert`, { params: params }
    )
  },
  // 推荐观点-添加
  insertViewpoint(data) {
    return axios.post(
      `/jm-expert-service/JmOmExpertViewpoint/insert`, data
    )
  }
}
export default expert
