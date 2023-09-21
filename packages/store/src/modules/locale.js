import { defineStore } from 'pinia'
import { store } from '../setupStore'

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN'
  }),
  getters: {
    getLocale(state) {
      return state.locale
    }
  },
  persist: true
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
