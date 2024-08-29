import { createApp } from 'vue'
import './style.css'
import '@/style/index.scss'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import globalComponent from '@/components'
import routers from '@/router'
import pinia from './store'
import './permission'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element/index.scss'
import { registerEcharts } from '@/plugins/echarts'
import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'
import { mockXHR } from '../mock/index'
import { hasPerm } from '@/directive/hasperm'
mockXHR()
const app = createApp(App)
hasPerm(app)
registerEcharts(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(globalComponent)
app.use(routers)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
