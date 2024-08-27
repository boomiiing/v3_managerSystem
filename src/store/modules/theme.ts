import { defineStore } from 'pinia'

export const useThemeStore = defineStore('ThemeStore', {
  actions: {
    setTheme(data) {
      this.currentTheme = data
      localStorage.setItem('THEME', data)
    },
  },
  state: (): { currentTheme: string | null } => {
    return {
      currentTheme: localStorage.getItem('THEME'),
    }
  },
  getters: {},
})
