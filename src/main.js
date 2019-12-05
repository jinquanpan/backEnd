import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'
import './assets/scss/index.scss'
import './components'
import * as filters from './util/filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VueParticles)
Vue.use(VueClipboard)
// 全局挂载提示框
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
