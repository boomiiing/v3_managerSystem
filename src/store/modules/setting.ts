import { defineStore } from 'pinia'

export const useLayOutSettingStore = defineStore('SettingStore', {
  actions: {},
  state() {
    return {
      fold: false,
      refresh: false
    }
  },
  getters: {},
})
