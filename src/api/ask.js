/**
 * ask模块接口列表
 * @author lyh
 * @date 2020-11-09
 */

import axios from '@/utils/request'
import store from '@/store'

const ask = {
  // 首页banner
  banner(data) {
    return axios.post(`/jm-information-service/JmBanner/findShowList`, data)
  },
  // 回答列表
  findAndAnswerIndexPage(data) {
    return axios.post(`/jm-information-service/JmMedia/findQuestionAndAnswerIndexPage`, data)
  },
  // 问题列表
  findQuestionPage(data) {
    return axios.post(`/jm-information-service/JmMedia/findQuestionPage`, data)
  },
  // 问答详情-列表
  findAnswerPage(data) {
    return axios.post(`/jm-information-service/JmMedia/findAnswerPage`, data)
  },
  // 视频-列表
  findMediaVideo(data) {
    return axios.post(`/jm-information-service/JmMedia/findMediaVideo`, data)
  },
  // 发布媒体
  publishAskMedia(data) {
    return axios.post(`/jm-information-service/JmMedia/publish`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      })
  },
  // 发布草稿箱
  publishDraft(data) {
    return axios.post(`/jm-information-service/JmMedia/publishDraft`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      })
  },
  // 草稿箱
  findPersonalPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findPersonalPage`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      })
  },
  // 问答收藏列表
  findCollectPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findCollectPage`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 作品管理-详情
  findOneDetail(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findOne`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 个人中心-关注列表
  findAttentionPage(data) {
    return axios.post(
      `/jm-user-service/JmAppUserAttention/findAttentionPage`, data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 个人中心-全部
  findPersonalShowPage(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findPersonalShowPage`,
      data
    )
  }
}
export default ask
