import store from '@/store'
export default function Initializer() {
  // 检查token是否过期 100 day
  const now = new Date().getTime()
  const tokenTime = new Date(store.state.user.tokenTime).getTime()
  if (now - tokenTime > 100 * 24 * 60 * 60 * 1000) {
    store.commit('logout')
    return
  }
  // 已经有token 获取用户信息
  if (store.state.user.token) {
    store.dispatch('getLoginUserDate')
  }
  // last step
}
