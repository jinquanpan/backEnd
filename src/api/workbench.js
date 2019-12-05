import request from '@/util/request'
// 待编制列表
export function workbenchListWriting(data) {
  return request({
    url: '/workbench/list-writing',
    method: 'post',
    data
  })
}
// 待审批列表
export function workbenchListReviewing(data) {
  return request({
    url: '/workbench/list-reviewing',
    method: 'post',
    data
  })
}
// 待批准列表
export function workbenchListApproving(data) {
  return request({
    url: '/workbench/list-approving',
    method: 'post',
    data
  })
}
// 编制
export function workbenchWrite(id, data) {
  return request({
    url: '/workbench/write/' + id,
    method: 'post',
    data
  })
}
// 审批
export function workbenchReview(id, data) {
  return request({
    url: '/workbench/review/' + id,
    method: 'post',
    data
  })
}
// 批准
export function workbenchApprove(id, data) {
  return request({
    url: '/workbench/approve/' + id,
    method: 'post',
    data
  })
}
// 作废文件
export function invalidFile(id, data) {
  return request({
    url: '/workbench/invalid-file/' + id,
    method: 'post',
    data
  })
}
// 文件详情
export function workbenchDetail(id, data) {
  return request({
    url: '/workbench/detail/' + id,
    method: 'post',
    data
  })
}
