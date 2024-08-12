import { reqLogin,reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
import { constantRoute } from '@/router/routers'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username:'',
      avatar:''
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'success'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.avatar = result.data.checkUser.avatar
        this.username = result.data.checkUser.username
        return 'success'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },
    userLogout(){
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()

    }
  },
  getters: {},
})
export default useUserStore
