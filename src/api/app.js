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
  },
  // 图片查询首页
  indexProduct(params) {
    return axios.get(`/production/search`, { params: params,
      baseURL: 'http://tuku.jiaomaenergy.com/md-api/'
    })
    // return axios({
    //   method: 'get',
    //   params: params,
    //   url: '/production/search',
    //   baseURL: 'http://tuku.jiaomaenergy.com/md-api/'
    // })
  },
  // 图片详情
  getDetail(params) {
    return axios.get(`/production/getDetail`, { params: params,
      baseURL: 'http://tuku.jiaomaenergy.com/md-api/'
    })
  }
}
export default app
