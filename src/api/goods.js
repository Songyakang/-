import http from '@/utils/request'

export function getData(params) {
  return http({
    url: 'item/list',
    method: 'get',
    params
  })
}

export function postData(data) {
  return http({
    url: 'item/create',
    method: 'post',
    data
  })
}

//修改商品
export function changeData(data) {
  return http({
    url: 'item/edit',
    method: 'post',
    data
  })
}
