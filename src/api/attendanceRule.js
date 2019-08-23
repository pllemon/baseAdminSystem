// 考勤规则管理
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/attendanceRuleInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/attendanceRuleInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/attendanceRuleInfo'
  let method = 'post'
  if (data.id) {
    url = '/attendanceRuleInfo/' + data.id
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
    url: '/attendanceRuleInfo/' + params.id,
    method: 'delete'
  })
}

