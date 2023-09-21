<script setup>
import { defineComponent, h } from 'vue'
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification
} from 'naive-ui'
import { useLocale } from '@mito/locale'
import { subscribeStore, useThemeStore } from '@mito/store'

defineOptions({ name: 'NProvider' })

subscribeStore()

const { getNaiveTheme } = useThemeStore()
const { getNaiveLocale, getNaiveDateLocale } = useLocale()

function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  }
})
</script>

<template>
  <n-config-provider
    :theme="getNaiveTheme"
    :date-locale="getNaiveDateLocale"
    :locale="getNaiveLocale"
    class="h-full"
    inline-theme-disabled
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <naive-provider-content />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>
