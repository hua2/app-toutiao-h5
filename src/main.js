import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
import bootstrap from './utils/bootstrap'
import 'amfe-flexible/index'

import './assets/css/base.css'

import './assets/scss/app.scss'
import './assets/css/utilities.css' // global style

Vue.config.productionTip = false

Vue.prototype.$api = api // 将api挂载到vue的原型上

const eventBus = {
  install(Vue) {
    Vue.prototype.$bus = new Vue()
  }
}
Vue.use(eventBus)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
