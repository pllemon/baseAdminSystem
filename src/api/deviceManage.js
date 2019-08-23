// 设备管理
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dms/deviceInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/dms/deviceInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/dms/deviceInfo'
  let method = 'post'
  if (data.id) {
    url = '/dms/deviceInfo/' + data.id
    method = 'put'
  }
  return request({
    url: url,
    method: method,
    data
  })
}

export function deleteSingle(params) {
  return request({
    url: '/dms/deviceInfo/' + params.id,
    method: 'delete'
  })
}

// 批量删除
export function batchRemove(data) {
  return request({
    url: '/dms/deviceInfo/batchRemove',
    method: 'delete',
    data
  })
}

// 重启设备
export function reboot(data) {
  return request({
    url: '/dms/deviceInfo/reboot',
    method: 'post',
    data
  })
}