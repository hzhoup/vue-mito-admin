import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pages from 'vite-plugin-pages'

/** @type {import('vite').UserConfig} */
const commonConfig = {
  server: {
    host: true
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1024
  },
  plugins: [
    vue(),
    vueJsx(),
    pages({
      dirs: 'src/views',
      extensions: ['vue'],
      exclude: ['**/components/**/*', '**/modules/**/*']
    })
  ]
}

export default commonConfig
