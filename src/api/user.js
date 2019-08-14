import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/jwt/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/jwt/info?token=' + token,
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
