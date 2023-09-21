import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createRouterGuard } from './guard'

export const router = createRouter({
  routes,
  strict: true,
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * @param {import('vue').App} app
 */
export async function setupRouter(app) {
  app.use(router)

  createRouterGuard(router)

  await router.isReady()
}
