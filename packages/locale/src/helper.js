export const loadedLocalePool = new Set()

export function setHtmlPageLang(locale) {
  loadedLocalePool.add(locale)

  document.querySelector('html')?.setAttribute('lang', locale)
}

export const localeOptions = [
  { label: '简体中文', key: 'zh-CN' },
  { label: 'English', key: 'en-US' }
]

export const availableLocales = localeOptions.map(locale => locale.key)
