import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import globalComponent from '@/components'
import router from "@/router"
import pinia from './store'
const app = createApp(App)
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
