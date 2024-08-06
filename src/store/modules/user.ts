import { reqLogin } from '@/api/user'
import {defineStore} from 'pinia'
import type {loginForm} from "@/api/user/type"
import type {UserState} from  "@/store/modules/types/type"
import {SET_TOKEN, GET_TOKEN} from '@/utils/token'
let useUserStore = defineStore('User',{
    state:():UserState=>{
      return {
        token:GET_TOKEN()
      }
    },
    actions:{
     async userLogin(data:loginForm){
       const result = await reqLogin(data)
       if(result.code==200){
          this.token = (result.data.token as string)
          SET_TOKEN((result.data.token as string))
          return 'success'
       }else{
          return Promise.reject(new Error(result.data.message))
       }
      }
    },
    getters:{

    }
}) 
export default useUserStore