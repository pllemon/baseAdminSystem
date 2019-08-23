// 时段管理
import request from '@/utils/request'

export function queryDevicePeriodInfos(data) {
  return request({
    url: '/dms/devicePeriodInfo/queryDevicePeriodInfos',
    method: 'post',
    data
  })
}