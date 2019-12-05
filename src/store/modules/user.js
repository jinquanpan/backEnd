import { login } from '@/api/login'
import { menu } from '@/menu'

const state = {
  // token: '111',
  // roles: [], //用户角色
  // tagsList: [], //打开的标签页个数,
  // isCollapse: false, //侧边导航是否折叠
  // lang:'zh',//默认语言
  // breadList:['home'],//面包屑导航，
  userName: '', // 登录用户名
  permission: [], // 权限
  menu: []
}

const mutations = {
  // 保存用户权限
  SET_PERMISSION(state, permission) {
    state.permission = permission
  },
  SET_USER_NAME(state, userName) {
    state.userName = userName
  },
  SET_MENU(state, menu) {
    state.menu = menu
  }
}

const actions = {
  login({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm)
        .then((res) => {
          commit('SET_USER_NAME', loginForm.loginName)
          commit('SET_PERMISSION', res.permissionSet)
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  },
  // logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_NAME', '')
      commit('SET_PERMISSION', [])
      commit('SET_MENU', [])
      resolve()
    })
  },
  // 生成左侧菜单
  buildLeftMenu({ commit }, permi) {
    return new Promise((resolve, reject) => {
      let result = getMenuByPermi(menu, permi)
      commit('SET_MENU', result)
      resolve(result)
    })
  },
  buildLeftMenu2({ commit }, permi) {
    return new Promise((resolve, reject) => {
      let data = permi.filter(v => /(menu)/.test(v))
      let result = data.map(v => {
        let o = {
          key: v,
          pid: getPid(v, data.filter(item => item !== v))
        }
        return o
      })
      result = getTree(result, 0)
      commit('SET_MENU', result)
      resolve(result)
      // console.log(result);
    })
  }
}
function getTree(data, pid) {
  let result = []
  data.map(v => {
    if (v.pid === pid) {
      let path = '/' + v.key.replace(/:menu/g, '').replace(/:/g, '/')
      let { index, title, icon } = getIconAndTitle(menu, path)
      let o = {
        index: index,
        title: title
      }
      if (icon) {
        o.icon = icon
      }
      let subs = getTree(data, v.key)
      if (subs.length) {
        o.subs = subs
      }
      result.push(o)
    }
  })
  return result
}

function getIconAndTitle(data, path) {
  let o = {}
  data.map(item => {
    if (!o.title) {
      if (item.index === path) {
        o = {
          title: item.title,
          index: item.index,
          icon: item.icon
        }
      } else {
        if (item.subs && item.subs.length) {
          o = getIconAndTitle(item.subs, path)
        }
      }
    }
  })
  return o
}

function getPid(str) {
  const arr = str.split(':')
  if (arr.length === 2) {
    return 0
  } else {
    if (str.indexOf('menu') > -1) {
      return (arr.slice(0, arr.length - 2)).join(':') + ':menu'
    } else {
      return (arr.slice(0, arr.length - 1)).join(':') + ':menu'
    }
  }
}

function getMenuByPermi(data, permi) {
  let result = []
  data.map(v => {
    let isShow = v.show || CheckMenuHasPermi(v.index, permi)
    if (isShow) {
      let o = {
        icon: v.icon,
        index: v.index,
        title: v.title
      }
      if (v.subs && v.subs.length) {
        o.subs = getMenuByPermi(v.subs, permi)
      }
      result.push(o)
    }
  })
  return result
}

function CheckMenuHasPermi(path, permi) {
  path = path.substr(1)
  path = path.replace(/\//g, ':') + ':menu'
  return !!permi.filter(item => item === path)
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
