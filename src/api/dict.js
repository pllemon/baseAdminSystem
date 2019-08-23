// 字典管理
import request from '@/utils/request'

export function getCombo(data) {
  return request({
    url: '/dms/baseDict/dict/combo',
    method: 'post',
    data
  })
}

export function getAllDict() {
  return request({
    url: '/dms/baseDict/all',
    method: 'get'
  })
}
