import { useTitle } from '@vueuse/core'
import { useLocale } from '@mito/locale'
import { createPermissionGuard } from './permission'

/**
 * 路由切换时记录是否已加载过页面
 * @param {import('vue-router').Router} router
 */
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

/**
 * 路由切换时显示顶部加载条
 * @param {import('vue-router').Router} router
 */
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

/**
 * 路由切换前销毁所有浮层
 * @param {import('vue-router').Router} router
 */
function createFloatingLayerGuard(router) {
  router.beforeEach(() => {
    window.$dialog?.destroyAll()
    window.$message?.destroyAll()
    window.$notification?.destroyAll()

    return true
  })
}

/**
 * 路由加载完成后修改页面对应语言标题
 * @param {import('vue-router').Router} router
 */
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
  createPermissionGuard(router)
  createPageTitleGuard(router)
}
