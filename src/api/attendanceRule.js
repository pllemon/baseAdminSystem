// 考勤规则管理
import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dms/attendanceRuleInfo/query/page',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/dms/attendanceRuleInfo/' + params.id,
    method: 'get',
    params
  })
}

export function updateSingle(data) {
  let url = '/dms/attendanceRuleInfo'
  let method = 'post'
  if (data.id) {
    url = '/dms/attendanceRuleInfo/' + data.id
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
    url: '/dms/attendanceRuleInfo/' + params.id,
    method: 'delete'
  })
}


export function batchRemove(data) {
  return request({
    url: '/dms/attendanceRuleInfo/batchRemove',
    method: 'delete',
    data
  })
}

export function queryRuleRelationDeviceInfos(data) {
  return request({
    url: '/dms/ruleRelationDeviceInfo/queryRuleRelationDeviceInfos',
    method: 'post',
    data
  })
}

