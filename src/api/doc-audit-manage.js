import request from '@/util/mock-request'

// 新建文件夹
export function docAuditInternalList(data) {
  return request({
    url: '/doc-audit-manage/list',
    method: 'post',
    data
  })
}
// 新建文件
export function docAuditManageSaveFile(data) {
  return request({
    url: '/doc-audit-manage/save-file',
    method: 'post',
    data
  })
}
// 删除文件夹
export function docAuditManageDeleteFolder(id) {
  return request({
    url: '/doc-audit-manage/delete-folder/' + id,
    method: 'post'
  })
}
// 删除文件
export function docAuditManageDeleteFile(id) {
  return request({
    url: '/doc-audit-manage/delete-file/' + id,
    method: 'post'
  })
}
// 文件详情
export function docAuditManageDetail(id) {
  return request({
    url: '/doc-audit-manage/detail/' + id,
    method: 'post'
  })
}
// 保存文件夹
export function docAuditManageSaveFolder(data) {
  return request({
    url: '/doc-audit-manage/save-folder',
    method: 'post',
    data
  })
}
// 重命名文件夹
export function docAuditManagerenameFolder(data) {
  return request({
    url: '/doc-audit-manage/remame-folder',
    method: 'post',
    data
  })
}
// 发布
export function docAuditManageUpgrade(data) {
  return request({
    url: '/doc-audit-manage/upgrade',
    method: 'post',
    data
  })
}
