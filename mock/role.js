/* eslint-disable */
import Mock from 'mockjs'

const User = []
const count = 20

for (let i = 0; i < count; i++) {
  User.push(Mock.mock({
    id: '@increment',
    'roleName|1': ['管理员','编辑人员','人事','财务'],
    'permission': ['list:add','list:eidt','list:delete'],
    createTime: Mock.Random.date('T'),
    // id: '@increment',
    // phone: /^1[385][1-9]\d{8}/,
    // status: 1,
    // post_time: +Mock.Random.date('T'),
    // post_master: '@first',
    // 'post_sex|1': [0, 1],
    // post_content: '我爱你哦',
    // 'position|1': ['深圳市宝安区', '深圳市龙岗区', '深圳市罗湖区', '深圳市龙华区'],
    // 'scope|1': ['异性', '全部', '我关注的人', 'vip']
  }))
}

export default [
  {
    url: '/role/list',
    type: 'get',
    response: config => {
      // const { type, title, page = 1, limit = 20, sort } = config.query
      //
      // let mockList = List.filter(item => {
      //   if (importance && item.importance !== +importance) return false
      //   if (type && item.type !== type) return false
      //   if (title && item.title.indexOf(title) < 0) return false
      //   return true
      // })
      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }
      //
      // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      
      return {
        code: 20000,
        data: {
          total: User.length,
          items: User
        }
      }
    }
  },
  
  {
    url: '/dongtai/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of User) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },
  
  {
    url: '/dongtai/audit',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of User) {
        if (article.id === +id) {
          article.status = 2
          return {
            code: 20000,
            message: '审核通过',
            data: {}
          }
        }
      }
    }
  }

]
