import axios from 'axios'

export function apiUserList() {
  return axios({
    url: '/user/list',
    method: 'get'
  }
  ).then((res) => {
    return res.data
  })
}

export function apiFileList() {
  return axios({
    url: '/file/list',
    method: 'get'
  }
  ).then((res) => {
    return res.data
  })
}

export function roleList() {
  return axios({
    url: '/role/list',
    method: 'get'
  }
  ).then((res) => {
    return res.data
  })
}
