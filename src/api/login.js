import request from '@/util/request'
// 登陆
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 图形验证码
export const captcha = process.env.VUE_APP_BASE_API + '/login/captcha'
