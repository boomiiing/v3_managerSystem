export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password?: string
  name: string
  phone?: string
  roleName?: string
}
export type Records = User[]

export interface allResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
export interface saveResponseData extends ResponseData {
  data?: {} | null
}

export interface roleInfo {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null | string
}
export type roles = roleInfo[]
export interface allRoleResponse extends ResponseData {
  data: {
    assignRoles: roles
    allRolesList: roles
  }
}
export interface assignRoles {
  roleIdList: number[]
  userId: number
}
export interface assignRolesData extends ResponseData {
  data: null
}
