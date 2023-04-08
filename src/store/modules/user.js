import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        // 本来数据应该在这里拿
        // const {data} = response
        console.log(response);
        // 伪装数据
        const data = {
          userInfo: {
            roles: ["admin"],
            introduction: "I am a super administrator",
            avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            nickname: response.rows.nickname
          },
        }
        commit('SET_TOKEN', "admin-token")
        setToken("admin-token")
        Cookies.set("userInfo", data.userInfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户数据
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(Cookies.get("userInfo"))
      const { nickname, avatar, roles } = data
      commit('SET_NAME', nickname)
      commit('SET_AVATAR', avatar)
      commit('SET_ROLES', roles)
      resolve(data)
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

