import request from '@/util/request'

// 列表
export function listExamine(data) {
  return request({
    url: '/doc-audit-internal/list',
    method: 'post',
    data
  })
}

// 新建文件
export function docAuditManageSaveFile(data) {
  return request({
    url: '/doc-audit-internal/save-file',
    method: 'post',
    data
  })
}

// 删除文件夹
export function docAuditManageDeleteFolder(id) {
  return request({
    url: '/doc-audit-internal/delete-folder/' + id,
    method: 'post'
  })
}

// 删除文件
export function docAuditManageDeleteFile(id) {
  return request({
    url: '/doc-audit-internal/delete-file/' + id,
    method: 'post'
  })
}

// 文件详情
export function docAuditManageDetail(id) {
  return request({
    url: '/doc-audit-internal/detail/' + id,
    method: 'post'
  })
}

// 保存文件夹
export function docAuditManageSaveFolder(data) {
  return request({
    url: '/doc-audit-internal/save-folder',
    method: 'post',
    data
  })
}

// 重命名文件夹
export function docAuditManagerenameFolder(data) {
  return request({
    url: '/doc-audit-internal/remame-folder',
    method: 'post',
    data
  })
}

// 发布
export function docAuditManageUpgrade(data) {
  return request({
    url: '/doc-audit-internal/upgrade',
    method: 'post',
    data
  })
}

// 文件类型
export function fileType() {
  return request({
    url: '/doc-audit-internal/list-file-type',
    method: 'post'
  }).then(res => {
    let result = []
    for (let i in res) {
      result.push({ label: res[i], value: i })
    }
    return result
  })
}

// 文件状态
export function fileStatus() {
  return request({
    url: '/doc-audit-internal/list-file-status',
    method: 'post'
  }).then(res => {
    let result = []
    for (let i in res) {
      result.push({ label: res[i], value: i })
    }
    return result
  })
}
// 文件详情
export function docAuditInternalDetail(id) {
  return request({
    method: 'post',
    url: '/doc-audit-internal/detail/' + id
  })
}
