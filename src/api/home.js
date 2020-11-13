/**
 * home模块接口列表
 * @author lyh
 * @date 2020-03-29
 */

import axios from '@/utils/request'
import store from '@/store'

const home = {
  // 首页tab切换
  queryDeviceMeta(data) {
    return axios.post(
      `/jm-information-service/JmMediaColumn/findColumnList`, data
    )
  },
  // 首页tab-列表
  findMediaColumn(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findMediaColumn`, data
    )
  },
  // 首页推荐
  findMediaIndex(data) {
    return axios.post(
      `/jm-information-service/JmMedia/findMediaIndex`, data
    )
  },
  // 首页 热门
  findInformationIndex(data) {
    return axios.post(
      `/jm-information-service/JmInformation/findInformationIndex`,
      data
    )
  },
  // 首页分类内容-推荐
  findInformation(data) {
    return axios.post(
      `/jm-information-service/JmInformation/findInformationIndex`,
      data
    )
  },
  // 获取评论列表
  findPage(data) {
    return axios.post(`/jm-comment-service/JmComment/findPage`, data)
  },
  // 发布评论
  publishComment(data) {
    return axios.post(`/jm-comment-service/JmComment/publishComment`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 获取点赞 收藏状态
  findDetail(data) {
    return axios.post(
      `/jm-information-service/JmInformation/findDetail`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 点赞
  praiseInfo(data) {
    return axios.post(`/jm-information-service/JmInformation/praise`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 收藏
  collectInfo(data) {
    return axios.post(`/jm-information-service/JmInformation/collect`, data, {
      headers: { 'jm-token': store.state.user.token }
    })
  },
  // 历史消息
  findHistoryPage(data) {
    return axios.post(
      `/jm-information-service/JmInformation/findHistoryPage`,
      data
    )
  },
  // 供应商联盟
  findOne(data) {
    return axios.post(`/jm-business-service/JmSupplierAlliance/findOne`, data)
  },
  // 企业号申请判断状态
  findAppUserStatus(data) {
    return axios.post(
      `/jm-business-service/JmBusinessAuthentication/findAppUserAuditingStatus`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },
  // 企业号申请
  insertBusiness(data) {
    return axios.post(
      `/jm-business-service/JmBusinessAuthentication/insertBusiness`,
      data,
      {
        headers: { 'jm-token': store.state.user.token }
      }
    )
  },

  // 供应链管理模块
  findList(data) {
    return axios.post(
      `/jm-information-service/JmInformationClassify/findList`,
      data
    )
  },
  // 供应链管理列表
  findSCPage(data) {
    return axios.post(`/jm-information-service/JmInformation/findSCPage`, data)
  },
  // 资讯查询-搜索视频分页查询
  findInfomationPage(data) {
    return axios.post(`/jm-es-service/JmInformation/findInfomationPage`, data)
  },
  // 上传图片 fileType为4
  uploadPicture(file, type) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('fileType', type)
    return axios.post(`/jm-rfq-service/common/upload-picture`, fd)
  },
  // 供应商评价列表
  appraiseList(params) {
    return axios.get(`/jm-rfq-service/appraise/list`, { params: params })
  },
  // 供应商评价详情
  appraiseDetails(params) {
    return axios.get(`/jm-rfq-service/appraise/detail`, { params: params })
  },

  // 申请
  insertBusinessApply(data) {
    return axios.post(`/jeecg-boot/businessAuthentication/insertBusiness`, data, {
      baseURL: 'http://jms.jiaomaenergy.com/'
    })
  }
}
export default home
