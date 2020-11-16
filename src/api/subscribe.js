import http from '@/utils/request'

export function list(params) {
  return http({
    url: '/book/list',
    params,
    method: 'get'
  })
}

export function addCommission(params) {
  return http({
    url: '/book/addCommission',
    params,
    method: 'post'
  })
}

export function addRemarks(data) {
  return http({
    url: '/book/addRemarks',
    data,
    method: 'post'
  })
}