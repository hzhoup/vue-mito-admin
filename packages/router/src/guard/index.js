function createPageLoadingBarGuard(router) {
  router.beforeEach(to => {
    if (to.meta?.loaded === true) return true

    window.$loadingBar?.start()

    return true
  })

  router.afterEach(() => {
    window.$loadingBar?.finish()

    return true
  })
}

function createFloatingLayerGuard(router) {
  router.beforeEach(() => {
    window.$dialog?.destroyAll()
    window.$message?.destroyAll()
    window.$notification?.destroyAll()

    return true
  })
}

/**
 * 创建路由守卫
 * @param {import('vue-router').Router} router
 */
export function createRouterGuard(router) {
  createPageLoadingBarGuard(router)
  createFloatingLayerGuard(router)
}
