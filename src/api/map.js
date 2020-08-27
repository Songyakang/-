import http from '@/utils/request'

export function getlocation(data) {
  return http({
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    method: 'get',
    data
  })
}