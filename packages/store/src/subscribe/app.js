import { effectScope, onScopeDispose, watch } from 'vue'
import { useTitle } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useLocaleStoreWithOut } from '../modules'

export function subscribeAppStore() {
  const route = useRoute()
  const localeStore = useLocaleStoreWithOut()
  const scope = effectScope()

  scope.run(() => {
    watch(
      () => localeStore.locale,
      newValue => {
        const title = route.meta?.title?.[newValue]
        const subTitle = import.meta.env.VITE_APP_TITLE
        useTitle(title ? `${title} | ${subTitle}` : subTitle)
      },
      { immediate: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
