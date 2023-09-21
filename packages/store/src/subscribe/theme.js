import { effectScope, onScopeDispose, watch } from 'vue'
import { useOsTheme } from 'naive-ui'
import { useThemeStoreWithOut } from '../modules'

export function subscribeThemeStore() {
  const themeStore = useThemeStoreWithOut()
  const osTheme = useOsTheme()
  const scope = effectScope()

  scope.run(() => {
    watch(
      osTheme,
      newValue => {
        if (themeStore.followSystemTheme) themeStore.setDarkMode(newValue === 'dark')
      },
      { immediate: true }
    )

    watch(
      () => themeStore.isDark,
      newValue => {
        const className = 'dark'
        if (newValue) {
          document.documentElement.classList.add(className)
        } else {
          document.documentElement.classList.remove(className)
        }
      },
      { immediate: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
