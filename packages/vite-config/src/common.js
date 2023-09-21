import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

/** @type {import('vite').UserConfig} */
const commonConfig = {
  server: {
    host: true
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1024
  },
  plugins: [vue(), vueJsx()]
}

export default commonConfig
