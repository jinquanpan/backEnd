import request from '@/util/request'

// =======================================用户管理=======================================
// 用户列表
export function operatorList(data) {
  return request({
    url: '/operator/list',
    method: 'post',
    data
  })
}
// 添加用户
export function operatorAdd(data) {
  return request({
    url: '/operator/add',
    method: 'post',
    data
  })
}
// 用户管理 - 修改
export function operatorUpdate(data) {
  return request({
    url: '/operator/update',
    method: 'post',
    data
  })
}
// 用户管理 - 角色下拉列表
export function operatorRoleSelectList(data) {
  return request({
    url: '/operator/role-select-list',
    method: 'post',
    data
  })
}
// 用户管理 - 启用
export function operatorEnable(id, data) {
  return request({
    url: `/operator/enable/${id}`,
    method: 'post',
    data
  })
}
// 用户管理 - 停用
export function operatorDisable(id, data) {
  return request({
    url: `/operator/disable/${id}`,
    method: 'post',
    data
  })
}
// 用户管理 - 重置密码
export function operatorResetPassword(id, data) {
  return request({
    url: `/operator/reset-password/${id}`,
    method: 'post',
    data
  })
}
// =======================================角色管理=======================================
// 角色管理 - 新增
export function roleAdd(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}
// 角色管理 - 分页查询
export function roleList(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}
// 权限列表 (新增页面-权限配置)
export function rolePermissionList(data) {
  return request({
    url: '/role/permission-list',
    method: 'post',
    data
  })
}
// 角色管理 - 查询单个角色
export function roleDetail(id, data) {
  return request({
    url: '/role/detail/' + id,
    method: 'post',
    data
  })
}
// 角色管理 - 删除角色
export function roleRemove(id, data) {
  return request({
    url: '/role/remove/' + id,
    method: 'post',
    data
  })
}
// 修改角色
export function roleUpdate(data) {
  return request({
    url: '/role/update/',
    method: 'post',
    data
  })
}
