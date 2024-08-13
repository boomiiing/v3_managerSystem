import request from '@/utils/request'
import {
  loginFormData,
  loginReasonseData,
  userInfoReasonseData,
} from '@/api/user/type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginReasonseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userInfoReasonseData>(API.USERINFO_URL)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
