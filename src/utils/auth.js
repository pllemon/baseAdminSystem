import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLoginStorage() {
  const username = localStorage.getItem('gdkqUser') || ''
  const password = localStorage.getItem('gdkqPwd') || ''
  let remember = false
  if (username) {
    remember = true
  }
  return {
    username,
    password,
    remember
  }
}

export function setLoginStorage(mes) {
  localStorage.setItem('gdkqUser', mes.username)
  localStorage.setItem('gdkqPwd', mes.password)
}

export function removeLoginStorage() {
  localStorage.removeItem('gdkqUser')
  localStorage.removeItem('gdkqPwd')
}
