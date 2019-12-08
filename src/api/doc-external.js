import request from '@/util/request'
import { ftruncate } from 'fs'
// 查询列表
export function listExternal(data) {
  return request({
    url: '/doc-external/list',
    method: 'post',
    data
  })
}

// 删除数据
export function listDelete(data) {
  return request({
    url: '/doc-external/delete-file',
    method: 'post',
    data
  })
}

// 生效查询
export function listEffect(data) {
  return request({
    url: '/doc-external/effective-file',
    method: 'post',
    data
  })
}
// 新建文件
export function docExternalSaveFile(data) {
  return request({
    url: '/doc-external/save-file',
    method: 'post',
    data
  })
}
// 升级文件
export function docExternalUpgrade(data) {
  return request({
    url: '/doc-external/upgrade',
    method: 'post',
    data
  })
}

// 版本查询
export function docExternalVersions(fileNo) {
  return request({
    url: '/doc-external/list-file-version/' + fileNo,
    method: 'post'
  })
}

// 新建文件
export function listCreate(data) {
  return request({
    url: '/doc-external/save-file',
    method: 'post',
    data
  })
}

// 升级文件
export function listUpgrade(data) {
  return request({
    url: '/doc-external/upgrade',
    method: 'post',
    data
  })
}

// 创建文件夹
export function folderCreadte(data) {
  return request({
    url: '/doc-external/save-folder',
    method: 'post',
    data
  })
}

// 查看文件详情
export function listDetails(fileId) {
  return request({
    url: '/doc-external/file-viewDetails/' + fileId,
    method: 'post',
    fileId
  })
}

export function fileType() {
  return request({
    url: '/doc-external/list-file-type',
    method: 'post'
  })
}
