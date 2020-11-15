/**
 * app模块接口列表
 * @author lyh
 * @date 2020-10-15
 */

import axios from '@/utils/request'
import store from '@/store'

const app = {
  // 媒体-详情
  findDetail(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findDetail`, data
    )
  },
  // 评论列表
  findPageComment(data) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/findPage`, data
    )
  },
  // 用户关注
  attentionAttention(data, token) {
    return axios.post(
      `/jm-user-service/JmAppUserAttention/attention`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 评论发布
  publishComment(data, token) {
    return axios.post(
      `/jm-comment-service/JmMediaComment/publishComment`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 点赞媒体
  praiseMedia(data, token) {
    return axios.post(
      `/jm-information-service/JmMedia/praise`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 收藏媒体
  collectMedia(data, token) {
    return axios.post(
      `/jm-information-service/JmMedia/collect`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  }
}
export default app
