import axios from 'axios'
import Vue from 'vue'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 5 // 5 minutes request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
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
    return res.data
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
