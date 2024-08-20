import request from '@/utils/request'
import {
  ResponseRoleData,
  SetRoleResponse,
  TreeResponseData,
} from '@/api/acl/role/type'
enum API {
  GETALLROLE_URL = '/admin/acl/role/',
  SETNEWROLE_URL = '/admin/acl/role/save',
  ALTEROLE_URL = '/admin/acl/role/update',
  DELETEROLE_URL = '/admin/acl/role/remove/',
  SETPERMISSION_URL = '/admin/acl/permission',
  GETROLEPERMISSION_URL = '/admin/acl/permission/toAssign/',
}
export const reqGetAllRole = (page: number, limit: number, roleName?: string) =>
  request.get<any, ResponseRoleData>(
    API.GETALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )
export const reqSetNewRole = (data: { roleName: string }) =>
  request.post<any, SetRoleResponse>(API.SETNEWROLE_URL, data)
export const reqAlterRole = (data: { id: number; roleName: string }) =>
  request.put<any, SetRoleResponse>(API.ALTEROLE_URL, data)
export const reqDeleteRole = (id: number) =>
  request.delete<any, SetRoleResponse>(API.DELETEROLE_URL + id)
export const reqSetPermission = () =>
  request.get<any, TreeResponseData>(API.SETPERMISSION_URL)
export const reqGetRolePermission = (id: number) =>
  request.get<any, TreeResponseData>(API.GETROLEPERMISSION_URL + id)
