import { useTitle } from '@vueuse/core'
import { useLocale } from '@mito/locale'

function createPageLoadedGuard(router) {
  const loadedPageMap = new Map()

  router.beforeEach(to => {
    Object.assign(to.meta, { loaded: loadedPageMap.has(to.path) })

    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)

    return true
  })
}

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

function createPageTitleGuard(router) {
  const { locale } = useLocale()

  router.afterEach(to => {
    const title = to.meta?.title?.[locale]
    const subTitle = import.meta.env.VITE_APP_TITLE
    useTitle(title ? `${title} | ${subTitle}` : subTitle)
  })
}

/**
 * 创建路由守卫
 * @param {import('vue-router').Router} router
 */
export function createRouterGuard(router) {
  createPageLoadedGuard(router)
  createPageLoadingBarGuard(router)
  createFloatingLayerGuard(router)
  createPageTitleGuard(router)
}
