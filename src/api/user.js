import http from '@/utils/request'

export function login(data) {
  return http({
    url: 'merchantLogin',
    method: 'post',
    data
  })
}