import request from '@/util/request'

// 新建文件夹
export function docControlsaveFolder(data) {
  return request({
    url: '/doc-control/saveFolder',
    method: 'post',
    data
  })
}

// 编辑文件夹
export function docControlrenameFolder(data) {
  return request({
    url: '/doc-control/renameFolder',
    method: 'post',
    data
  })
}
// 删除文件夹
export function docControlDeleteFolder(data) {
  return request({
    url: '/doc-control/deleteFolder',
    method: 'post',
    data
  })
}
// 新建文件
export function docControlSaveFile(data) {
  return request({
    url: '/doc-control/saveFile',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除文件
export function docControlDelFile(data) {
  return request({
    url: '/doc-control/deleteFile',
    method: 'post',
    data
  })
}

export function docControlList(data) {
  return request({
    method: 'post',
    url: '/doc-control/list',
    data: data
  })
}
// 文件版本列表
export function docControlListFileVersion(fileNo) {
  return request({
    method: 'post',
    url: '/doc-control/list-file-version/' + fileNo
  })
}
// 文件详情
export function docControlDetail(docControlId) {
  return request({
    method: 'post',
    url: '/doc-control/detail/' + docControlId
  })
}
// 升级文件
export function docControlUpgrade(data) {
  return request({
    method: 'post',
    url: '/doc-control/upgrade',
    data
  })
}
