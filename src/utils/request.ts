import axios from 'axios'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
request.interceptors.response.use(
  (response) => {
    console.log(response)
   
    return response.data?response.data:response
  },
  (err) => {
    console.log(err)
    let message = ''
    let status = err.response.status
    switch (status) {
      case 401:
        message = 'Token过期'
        break
      case 403:
        message = '无权限'
        break
      case 404:
        message = '找不到接口'
        break
      case 500:
        message = '服务端错误'
        break
      default:
        message = '网络错误'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(err)
  },
)
export default request
