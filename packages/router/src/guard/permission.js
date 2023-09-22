import { useAuthStoreWithOut } from '@mito/store'

/**
 * 权限路由守卫
 * @param {import('vue-router').Router} router
 */
export function createPermissionGuard(router) {
  const authStore = useAuthStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    if (to.path === '/login' && authStore.token) {
      next(to.query?.redirect ?? '/')
      return
    }

    if (!authStore.token) {
      if (to.meta?.ignoreAuth) {
        next()
        return
      }

      const redirectData = {
        path: '/login',
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }

      next(redirectData)
      return
    }

    next()
  })
}
