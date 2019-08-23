// 考勤数据对接
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/outInterfaceInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/outInterfaceInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/outInterfaceInfo'
  let method = 'post'
  if (data.id) {
    url = '/outInterfaceInfo/' + data.id
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
    url: '/outInterfaceInfo/' + params.id,
    method: 'delete'
  })
}

