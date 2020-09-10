import http from '@/utils/request'

export function recommendList(params) {
  return http({
    url: '/user/recommendList',
    params,
    method: 'get'
  })
}

export function transactionDetails(params) {
  return http({
    url: '/transactionDetails/list',
    params,
    method: 'get'
  })
}
