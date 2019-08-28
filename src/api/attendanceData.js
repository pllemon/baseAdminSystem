// 考勤数据对接
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dms/outInterfaceInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/dms/outInterfaceInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/dms/outInterfaceInfo'
  let method = 'post'
  if (data.id) {
    url = '/dms/outInterfaceInfo/' + data.id
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
    url: '/dms/outInterfaceInfo/' + params.id,
    method: 'delete'
  })
}

export function batchRemove(data) {
  return request({
    url: '/dms/outInterfaceInfo/batchRemove',
    method: 'delete',
    data
  })
}


export function queryOutInterfaceDeviceInfos(data) {
  return request({
    url: '/dms/outInterfaceDeviceInfo/queryOutInterfaceDeviceInfos',
    method: 'post',
    data
  })
}
