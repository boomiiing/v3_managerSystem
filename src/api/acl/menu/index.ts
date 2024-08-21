import request from '@/utils/request'
import { PermissionData, SaveResponseData } from '@/api/acl/menu/type'
enum API {
  GETPERMISSION_URL = '/admin/acl/permission',
  SAVEPERMISSION_URL = '/admin/acl/permission/save',
  EDITPERMISSION_URL = '/admin/acl/permission/update',
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}
export const reqGetPermission = () =>
  request.get<any, PermissionData>(API.GETPERMISSION_URL)
export const reqSavePermission = (data: any) =>
  request.post<any, SaveResponseData>(API.SAVEPERMISSION_URL, data)

export const reqEditPermission = (data: any) =>
  request.put<any, SaveResponseData>(API.EDITPERMISSION_URL, data)

export const reqDeletePermission = (id: number) =>
  request.delete<any, SaveResponseData>(API.DELETEMENU_URL + id)
