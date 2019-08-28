// 人员管理
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dms/personInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/dms/personInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/dms/personInfo'
  let method = 'post'
  if (data.id) {
    url = '/dms/personInfo/' + data.id
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
    url: '/dms/personInfo/' + params.id,
    method: 'delete'
  })
}

export function batchRemove(data) {
  return request({
    url: '/dms/personInfo/batchRemove',
    method: 'delete',
    data
  })
}

// 导入模版地址
export function exportTemplate() {
  return '/dms/file/exportTemplate'
}

// 导出人员
export function personInfoExport() {
  return '/dms/personInfo/personInfoExport'
}

// 批量关联
export function batchRelation(data, type) {
  let url = '/dms/personInfo/batchRelation'
  if (type == 1) {
    url = '/dms/personInfo/deviceRelation'
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}



export function queryPersonDeviceInfos(data) {
  return request({
    url: '/dms/personDeviceInfo/queryPersonDeviceInfos',
    method: 'post',
    data
  })
}