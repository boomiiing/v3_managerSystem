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
