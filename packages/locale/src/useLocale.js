import { computed } from 'vue'
import { useLocaleStoreWithOut } from '@mito/store'
import { i18n } from './setupI18n'

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()

  const locale = localeStore.getLocale

  const getNaiveLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale)?.naiveLocale ?? {}
  })

  const getNaiveDateLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale)?.naiveDateLocale ?? {}
  })

  return {
    locale,
    getNaiveLocale,
    getNaiveDateLocale
  }
}
