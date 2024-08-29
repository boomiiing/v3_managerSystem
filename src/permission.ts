//路由鉴权，某一个路由什么条件下可以被访问
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from '@/setting'
nprogress.configure({ showSpinner: false })
import pinia from './store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
//路由前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = setting.title + '-' + to.meta.title
  nprogress.start()
  let token = userStore.token
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      let username = userStore.username
      console.log(username)
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to, replace: true })
        } catch (err) {
          await userStore.userLogout()
          next({ path: '/login' })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

//路由后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
