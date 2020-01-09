import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissionList:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION: (state, permission) => {
      state.permissionList = permission
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead + data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          let fmtRoutes = formatRoutes(data.permissionList);
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
            commit('SET_PERMISSION', fmtRoutes)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
export const formatRoutes = (routes) => {
  let fmRoutes = [];
  routes.forEach(router => {
    let path = ""
    let redirect;
    if (router.type === 0) {
      path = "/" + router.path
    } else {
      path = router.path
    }
    if(path==="/"){
      path=""
      redirect="/home"
    }
    let name = router.path
    let meta = router.meta
    let uri = router.uri
    let children = router.children
    let hidden = router.isShow == 0 ? true : false
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      name: name,
      meta: meta,
      redirect:redirect,
      children:children,
      hidden: hidden,
      component(resolve) {
        if (router.type === 0) {
          require(['../../views/layout/Layout'], resolve)
        } else {
          require(['../../views' + uri], resolve)
        }
      }
    }
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
