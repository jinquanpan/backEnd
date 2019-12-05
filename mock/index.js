import Mock from 'mockjs'
import file from './file'
import user from './user'
import role from './role'

const arr = [
  ...file,
  ...user,
  ...role,
]
arr.map(v => {
  Mock.mock(v.url, v.type, v.response)
})
