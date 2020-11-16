import http from '@/utils/request'

export function login(data) {
  return http({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function info() {
  return http({
    url: '/user/info',
    method: 'get'
  })
}

export function list(params) {
  return http({
    url: '/user/wechatUserList',
    params,
    method: 'get'
  })
}

export function editWechatUser(data) {
  return http({
    url: '/user/editWechatUser',
    data,
    method: 'post'
  })
}
export function updateAdminStatus(data) {
  return http({
    url: '/user/updateAdminStatus',
    data,
    method: 'post'
  })
}