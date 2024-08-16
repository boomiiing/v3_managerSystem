import request from '@/utils/request'
import {
  allResponseData,
  User,
  saveResponseData,
  allRoleResponse,
  assignRoles,
  assignRolesData,
} from './type'
enum API {
  ALLUSER_URL = '/admin/acl/user/',
  SAVEUSER_URL = '/admin/acl/user/save',
  UPDATE_URL = '/admin/acl/user/update',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  ASSIGNROLES_URL = '/admin/acl/user/doAssignRole',
  REMOVESOMEONE_URL = '/admin/acl/user/remove/',
  BATCHREMOVE_URL = '/admin/acl/user/batchRemove',
}
export const reqUserInfo = (page: number, limit: number, username?: string) =>
  request.get<any, allResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
export const reqSaveUser = (data: User) =>
  request.post<any, saveResponseData>(API.SAVEUSER_URL, data)
export const reqUpdateUser = (data: User) =>
  request.put<any, saveResponseData>(API.UPDATE_URL, data)
export const getAllRole = (userId: number) =>
  request.get<any, allRoleResponse>(API.ALLROLE_URL + userId)
export const doAssignRole = (data: assignRoles) =>
  request.post<any, assignRolesData>(API.ASSIGNROLES_URL, data)
export const removeuser = (id: number) =>
  request.delete<any, assignRolesData>(API.REMOVESOMEONE_URL + id)
export const BatchRemoveuser = (idList: number[]) =>
  request.delete<any, assignRolesData>(API.BATCHREMOVE_URL, { data: idList })
