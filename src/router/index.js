import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/home/Index.vue')
    },
    {
      path: '/search',
      component: () =>
        import(/* webpackChunkName: "search" */ '@/views/search/Index.vue')
    },
    {
      path: '/detailInfo',
      component: () =>
        import(/* webpackChunkName: "home_detailInfo" */ '@/views/home/DetailInfo.vue')
    },
    {
      path: '/details/:id',
      component: () =>
          import(/* webpackChunkName: "details_index" */ '@/views/details/Index.vue')
    },
    {
      path: '/details/:id/:userId/:token',
      component: () =>
          import(/* webpackChunkName: "details_index" */ '@/views/details/Index.vue')
    },
    {
      path: '/askDetails/:id',
      component: () =>
          import(/* webpackChunkName: "details_askDetails" */ '@/views/details/AskDetails.vue')
    },
    {
      path: '/askDetails/:id/:userId/:token',
      component: () =>
          import(/* webpackChunkName: "details_askDetails" */ '@/views/details/AskDetails.vue')
    },
    {
      path: '/videoDetails/:id',
      component: () =>
          import(/* webpackChunkName: "details_videoDetails" */ '@/views/details/VideoDetails.vue')
    },
    {
      path: '/videoDetails/:id/:userId/:token',
      component: () =>
          import(/* webpackChunkName: "details_videoDetails" */ '@/views/details/VideoDetails.vue')
    },
    {
      path: '/shareDetails/:id/',
      component: () =>
          import(/* webpackChunkName: "details_shareDetails" */ '@/views/details/ShareDetails.vue')
    },
    {
      path: '/shareAskDetails/:id/',
      component: () =>
          import(/* webpackChunkName: "details_shareAskDetails" */ '@/views/details/ShareAskDetails.vue')
    },
    {
      path: '/shareVideoDetails/:id/',
      component: () =>
          import(/* webpackChunkName: "details_shareVideoDetails" */ '@/views/details/ShareVideoDetails.vue')
    },
    {
      path: '/history/historyPage',
      component: () =>
        import(/* webpackChunkName: "home-history_historyPage" */ '@/views/home/history/HistoryPage.vue'),
      meta: {
        title: '历史消息'
      }
    },
    {
      path: '/history/moreHistory',
      component: () =>
        import(/* webpackChunkName: "home_history_moreHistory" */ '@/views/home/history/MoreHistory.vue'),
      meta: {
        title: '更多-历史消息'
      }
    },
    {
      path: '/history/settledPage',
      component: () =>
        import(/* webpackChunkName: "home_history_settledPage" */ '@/views/home/history/SettledPage.vue'),
      meta: {
        title: '入驻申请'
      }
    },
    {
      path: '/operation',
      component: () =>
        import(/* webpackChunkName: "operation" */ '@/views/operation/Index.vue'),
      meta: {
        title: '问答'
      }
    },
    {
      path: '/recommend/recommendDetails',
      component: () =>
        import(/* webpackChunkName: "operation_recommendDetails" */ '@/views/operation/recommend/RecommendDetails.vue'),
      meta: {
        title: '问答详情'
      }
    },
    {
      path: '/recommend/headerDetails',
      component: () =>
        import(/* webpackChunkName: "operation_headerDetails" */ '@/views/operation/recommend/HeaderDetails.vue'),
      meta: {
        title: '问答头像详情'
      }
    },
    {
      path: '/recommend/publishView',
      component: () =>
        import(/* webpackChunkName: "operation_publishView" */ '@/views/operation/recommend/PublishView.vue'),
      meta: {
        title: '发布观点'
      }
    },
    {
      path: '/video',
      component: () =>
        import(/* webpackChunkName: "video" */ '@/views/video/Index.vue'),
      meta: {
        title: '角马视频 '
      }
    },
    {
      path: '/ask',
      component: () =>
          import(/* webpackChunkName: "ask" */ '@/views/ask/Index.vue'),
      meta: {
        title: '问答'
      }
    },
    {
      path: '/ask/publishAnswer',
      component: () =>
          import(/* webpackChunkName: "ask_publishAnswer" */ '@/views/ask/PublishAnswer.vue'),
      meta: {
        title: '提问'
      }
    },
    {
      path: '/ask/publishVideo',
      component: () =>
          import(/* webpackChunkName: "ask_publishVideo" */ '@/views/ask/PublishVideo.vue'),
      meta: {
        title: '视频'
      }
    },
    {
      path: '/ask/details',
      component: () =>
          import(/* webpackChunkName: "ask_details" */ '@/views/ask/Details.vue'),
      meta: {
        title: '问答详情'
      }
    },
    {
      path: '/ask/answerList',
      component: () =>
          import(/* webpackChunkName: "ask_answerList" */ '@/views/ask/AnswerList.vue'),
      meta: {
        title: '问题'
      }
    },
    {
      path: '/ask/draftBoxList',
      component: () =>
          import(/* webpackChunkName: "ask_draftBoxList" */ '@/views/ask/DraftBoxList.vue'),
      meta: {
        title: '草稿箱'
      }
    },
    {
      path: '/user',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/user/Index.vue'),
      meta: {
        title: '我的'
      }
    },
    {
      path: '/user/collectPage',
      component: () =>
        import(/* webpackChunkName: "user_collectPage" */ '@/views/user/CollectPage.vue'),
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/user/attentionPage',
      component: () =>
          import(/* webpackChunkName: "user_attentionPage" */ '@/views/user/AttentionPage.vue'),
      meta: {
        title: '我的关注'
      }
    },
    {
      path: '/user/personalHomePage',
      component: () =>
          import(/* webpackChunkName: "user_personalHomePage" */ '@/views/user/PersonalPage.vue'),
      meta: {
        title: '个人主页'
      }
    },
    {
      path: '/user/aboutPage',
      component: () =>
        import(/* webpackChunkName: "user_aboutPage" */ '@/views/user/AboutPage.vue'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/user/advicePage',
      component: () =>
        import(/* webpackChunkName: "user_advicePage" */ '@/views/user/AdvicePage.vue'),
      meta: {
        title: '意见反馈'
      }
    },
    {
      path: '/user/personal',
      component: () =>
        import(/* webpackChunkName: "user_personal" */ '@/views/user/personal/Index.vue'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/user/personal/updateMobile',
      component: () =>
        import(/* webpackChunkName: "user_personal_updateMobile" */ '@/views/user/personal/UpdateMobile.vue'),
      meta: {
        title: '更改手机号'
      }
    },
    {
      path: '/user/personal/updateSign',
      component: () =>
        import(/* webpackChunkName: "user_personal_updateSign" */ '@/views/user/personal/UpdateSign.vue'),
      meta: {
        title: '更改签名'
      }
    },
    {
      path: '/user/personal/updateNickName',
      component: () =>
        import(/* webpackChunkName: "user_personal_updateNickName" */ '@/views/user/personal/UpdateNickName.vue'),
      meta: {
        title: '更改签名'
      }
    },
    {
      path: '/user/personal/updateCompany',
      component: () =>
        import(/* webpackChunkName: "user_personal_updateCompany" */ '@/views/user/personal/UpdateCompany.vue'),
      meta: {
        title: '公司信息'
      }
    },
    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/Index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/login/agreement',
      component: () =>
        import(/* webpackChunkName: "login_agreement" */ '@/views/login/Agreement.vue'),
      meta: {
        title: '隐私协议'
      }
    },
    {
      path: '/login/userPage',
      component: () =>
        import(/* webpackChunkName: "login_userPage" */ '@/views/login/UserPage.vue'),
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/user/settingPage',
      component: () =>
        import(/* webpackChunkName: "user_settingPage" */ '@/views/user/SettingPage.vue'),
      meta: {
        title: '退出登录'
      }
    },
    {
      path: '/user/memberPage',
      component: () =>
        import(/* webpackChunkName: "user_memberPage" */ '@/views/user/MemberPage.vue'),
      meta: {
        title: '会员中心 '
      }
    },
    {
      path: '/other/registeredPage',
      component: () =>
          import(/* webpackChunkName: "other_registeredPage" */ '@/views/other/RegisteredPage.vue'),
      meta: {
        title: '申请 '
      }
    },
    {
      path: '/other/successLink',
      component: () =>
          import(/* webpackChunkName: "other_successLink" */ '@/views/other/SuccessLink.vue'),
      meta: {
        title: '申请结果 '
      }
    },
    {
      path: '/404',
      component: () =>
        import(/* webpackChunkName: "404" */ '@/views/other/404.vue'),
      meta: {
        title: '404 '
      }
    },
    {
      path: '*', // 此处需特别注意至于最底部
      redirect: '/404'
    }
  ]
})
const whiteList = [
  '/',
  '/login',
  '/search',
  '/ask',
  '/ask/details',
  '/history/historyPage',
  '/history/moreHistory',
  '/history/settledPage',
  '/manage',
  '/evaluate',
  '/evaluate/search',
  '/evaluate/details',
  '/supplier',
  // '/operation',
  '/video',
  // '/video/videoClassify',
  // '/video/videoDetails',
  // '/video/moreHot',
  // '/video/moreColumn',
  // '/video/videoDetails',
  '/login/agreement',
  '/login/userPage',
  '/detailInfo'
]
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title || '角马能源'
  if (store.state.user.token) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else if (to.path.startsWith('/details/')) {
      next()
    } else if (to.path.startsWith('/askDetails/')) {
      next()
    } else if (to.path.startsWith('/videoDetails/')) {
      next()
    } else if (to.path.startsWith('/shareDetails/')) {
      next()
    } else if (to.path.startsWith('/shareVideoDetails/')) {
      next()
    } else if (to.path.startsWith('/shareAskDetails/')) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})
export default router
