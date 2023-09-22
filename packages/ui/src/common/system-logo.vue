<template>
  <div class="system-logo" :class="{ 'flex-col': vertical }">
    <img :class="{ 'animate-bounce': bounce }" src="/logo.png" alt="logo" />
    <span
      v-show="showTitle"
      class="whitespace-nowrap prose prose-slate max-w-none dark:prose-invert xs:opacity-0"
      :class="{ 'mt-2': vertical, 'ml-2': !vertical }"
    >
      {{ title }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SystemLogo' })

defineProps({
  bounce: Boolean,
  vertical: Boolean,
  showTitle: Boolean
})

const title = import.meta.env.VITE_APP_TITLE
</script>

<style scoped lang="scss">
.system-logo {
  @apply action flex items-center px-1 cursor-pointer transition-all duration-200 ease;
}
</style>
