export interface loginForm {
  username: string
  password: string
}
export interface loginResponseData {
  code: number
  data: { token?: string,message?:string }
}
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}