import { createI18n } from 'vue-i18n'
import { useLocaleStoreWithOut } from '@mito/store'
import { availableLocales, setHtmlPageLang } from './helper'

/** @type {import('vue-i18n').I18n} */
// eslint-disable-next-line import/no-mutable-exports
export let i18n

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()

  const defaultLocale = await import(`./lang/${localeStore.locale}.js`)
  const message = defaultLocale.default ?? {}

  setHtmlPageLang(localeStore.locale)

  return {
    legacy: false,
    availableLocales,
    missingWarn: false,
    silentFallbackWarn: true,
    locale: localeStore.locale,
    silentTranslationWarn: true,
    fallbackLocale: localeStore.fallbackLocale,
    messages: {
      [localeStore.locale]: message
    }
  }
}

/**
 * @param {import('vue').App} app
 */
export async function setupI18n(app) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
