import http from '@/utils/request'

export function list(params) {
  return http({
    url: '/book/list',
    params,
    method: 'get'
  })
}