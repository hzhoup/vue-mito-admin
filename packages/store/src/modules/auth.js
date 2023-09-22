import { defineStore } from 'pinia'
import { store } from '../setupStore'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: ''
  }),
  persist: {
    paths: ['token']
  }
})

export function useAuthStoreWithOut() {
  return useAuthStore(store)
}
