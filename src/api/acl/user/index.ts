import request from '@/utils/request'
import { allResponseData, User, saveResponseData } from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  SAVEUSER_URL = '/admin/acl/user/save',
  UPDATE_URL = '/admin/acl/user/update',
}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, allResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
export const reqSaveUser = (data: User) =>
  request.post<any, saveResponseData>(API.SAVEUSER_URL, data)
export const reqUpdateUser = (data: User) =>
  request.put<any, saveResponseData>(API.UPDATE_URL, data)
