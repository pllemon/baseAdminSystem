import request from '@/utils/request'

export function deviceStatusCount(data) {
  return request({
    url: '/dms/index/deviceStatusCount',
    method: 'post',
    data
  })
}

export function getUnusualAttendanceCount(data) {
  return request({
    url: '/dms/index/getUnusualAttendanceCount',
    method: 'post',
    data
  })
}

export function devicePersonCount(data) {
  return request({
    url: '/dms/index/devicePersonCount',
    method: 'post',
    data
  })
}

export function openDevicePersonCount(data) {
  return request({
    url: '/dms/index/openDevicePersonCount',
    method: 'post',
    data
  })
}