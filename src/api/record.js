import request from '@/utils/request'

// 考勤记录
export function queryAttendanceRecord(data) {
  return request({
    url: '/dms/openRecordInfo/queryAttendanceRecord',
    method: 'post',
    data
  })
}

// 门禁记录
export function queryRecord(data) {
  return request({
    url: '/dms/openRecordInfo/query/page',
    method: 'post',
    data
  })
}


// 导出考勤记录
export function attendanceRecordExport() {
  return '/dms/openRecordInfo/attendanceRecordExport'
}

// 导出门禁记录
export function openRecordExport() {
  return '/dms/openRecordInfo/openRecordExport'
}