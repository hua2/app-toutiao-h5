import api from '@/api' // 导入api接口

function save(name, data, remember = false) {
  if (remember) {
    localStorage.setItem(name, JSON.stringify(data))
  } else {
    sessionStorage.setItem(name, JSON.stringify(data))
  }
}

function get(name) {
  const data = localStorage.getItem(name) || sessionStorage.getItem(name)
  return data ? JSON.parse(data) : null
}

export default {
  state: {
    token: get('USER_TOKEN'),
    userId: get('USER_ID'),
    tokenTime: get('USER_TOKEN_TIME'),
    account: {}
  },
  mutations: {
    // 登录成功将, token保存在localStorage中
    setToken: (state, data) => {
      save('USER_TOKEN', data.token, true)
      save('USER_ID', data.userId, true)
      save('USER_TOKEN_TIME', new Date().getTime(), true)
      state.token = data.token
      state.userId = data.userId
    },
    setAccount: (state, data) => {
      state.account = data
    },
    // 退出登录将, token清空
    logout: state => {
      localStorage.clear()
      sessionStorage.clear()
      state.token = null
    }
  },
  actions: {
    getLoginUserDate({ commit, state }) {
      const id = state.userId
      api.user.personInfo(id).then(res => {
        commit('setAccount', res.data)
      })
    }
  }
}
