export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export type Children = {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null | number
  toCode: null | number
  type: number
  status: null | number
  level: number
  children: Children[]
}
export interface PermissionData extends ResponseData {
  data: Children[]
}
export interface SaveResponseData extends ResponseData {
  data: null | {}
}
export interface Query {
  name: string
  code?: number
  pid?: number
  id?: number
}
