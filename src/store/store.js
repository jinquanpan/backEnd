import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins: [createPersistedState({
    storage: window.localStorage, // default
    reducer(val) {
      return {
        user: {
          userName: val.user.userName,
          permission: val.user.permission
          // menu: val.user.menu,
        },
        app: {
          tagsList: val.app.tagsList,
          isCollapse: val.app.isCollapse
        }
      }
    }
  })]
})
