import SvgIcon from '@/components/SvgIcon/index.vue'
import { App, Component } from 'vue'
const allGlobalComponent: { [key: string]: Component } = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
