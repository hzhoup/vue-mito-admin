import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const store = createPinia()

/**
 * @param {import('vue').App} app
 */
export function setupStore(app) {
  store.use(
    createPersistedState({
      storage: localStorage,
      key: key => key.toUpperCase()
    })
  )

  app.use(store)
}
