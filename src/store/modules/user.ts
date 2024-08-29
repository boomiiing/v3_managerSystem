import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from '@/store/modules/types/type'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routers'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import router from '@/router'
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import {
  loginFormData,
  loginReasonseData,
  userInfoReasonseData,
} from '@/api/user/type'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
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
        this.buttons = result.data.buttons
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        let addUserRoute = [...userAsyncRoute, ...anyRoute]
        addUserRoute.forEach((element) => {
          router.addRoute(element)
        })
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
