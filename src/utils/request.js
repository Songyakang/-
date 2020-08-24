import axios from 'axios'
import qs from 'qs'
const http = axios.create({
  baseURL: 'https://ceshi.juanpao.cn/api/web/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 2000
})

//  设置响应拦截器
http.interceptors.response.use((res) => {
  if (res.data.status === 1001) {
    this.$router.push({path: '/login'})
  } else if (res.data.status === 200) {
    return res.data
  } else {
    return Promise.reject(res.data)
  }
}, function (error) {
  return Promise.reject(error)
})

//  设置请求拦截器
http.interceptors.request.use((config) => { 
  if (config.method !== 'get' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default http