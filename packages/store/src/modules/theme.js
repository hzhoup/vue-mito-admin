import { defineStore } from 'pinia'
import { darkTheme, useOsTheme } from 'naive-ui'
import { store } from '../setupStore'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => {
    const osTheme = useOsTheme()

    return {
      isDark: osTheme ? osTheme.value === 'dark' : false,
      followSystemTheme: true
    }
  },
  getters: {
    getNaiveTheme(state) {
      return state.isDark ? darkTheme : undefined
    }
  },
  actions: {
    setDarkMode(isDark) {
      this.isDark = isDark
    },
    toggleDark() {
      this.isDark = !this.isDark
    }
  },
  persist: true
})

export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
