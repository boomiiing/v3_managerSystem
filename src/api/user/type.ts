export interface loginFormData {
  username: string
  password: string
}
export interface responseData {
  code: number
  message:string
  ok:boolean  
}

export interface loginReasonseData extends responseData{
  data:string
}

export interface userInfoReasonseData extends responseData{
  data:{
    routes:string[]
    buttons:string[]
    roles:string[]
    name:string
    avatar:string
  }
}


