import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from '@/store/modules/types/type'
import { constantRoute } from '@/router/routers'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import {
  loginFormData,
  loginReasonseData,
  userInfoReasonseData,
} from '@/api/user/type'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      const result: loginReasonseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'success'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      const result: userInfoReasonseData = await reqUserInfo()
      if (result.code == 200) {
        this.avatar = result.data.avatar
        this.username = result.data.name
        return 'success'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'success'
      } else {
        return Promise.reject('失败！')
      }
    },
  },
  getters: {},
})
export default useUserStore
