import axios from 'axios'
import Vue from 'vue'
import store from '@/store/store'
import router from '@/router/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 5, // 5 minutes request timeout
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config);
    // if (config.method === 'get') {
    //   let newParams = {}
    //   for (let i in config.params) {
    //     if (config.params[i]) {
    //       newParams[i] = config.params[i]
    //     }
    //   }
    //   config.params = newParams
    // }
    // if (config.method ==='post') {
    //   var newData = {}
    //   for(let i in config.data) {
    //     if (config.data[i]) {
    //       newData[i] = config.data[i]
    //     }
    //   }
    //   config.data = newData
    // }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    const code = res ? parseInt(res.code) : 0
    // if the custom code is not 200, it is judged as an error.
    if (code === 200) {
      return res.data
    } else {
      if (code === 401) {
        store.dispatch('user/logout').then(() => {
          router.push('/login')
        })
      } else {
        Vue.prototype.$message({
          message: res.message || '未知错误',
          type: 'error',
          duration: 5000
        })
      }
      return Promise.reject(response)
    }
  },
  (err, code) => {
    Vue.prototype.$message({
      message: '服务器错误',
      type: 'error',
      duration: 3000
    })
    return Promise.reject(err)
  }
)

export default service
