export interface ResponseData {
  code: number
  message: string
  ok: string
}
export type record = {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: string | null
}
export interface ResponseRoleData extends ResponseData {
  data: {
    records: record
    total: number
    size: number
    current: number
    orders: string[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId?: boolean
    maxLimit?: boolean
    searchCount: boolean
    pages: number
  }
}
export interface SetRoleResponse extends ResponseData {
  data: null | string
}
export type Children = {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null | string
  toCode: null | string
  type: number
  select?: boolean
  status: null | string
  level: number
  children: Children[]
}
export interface TreeResponseData extends ResponseData {
  data: Children[]
}
