import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pages from 'vite-plugin-pages'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

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
    }),
    components({
      dts: false,
      resolvers: [
        iconsResolver({
          componentPrefix: 'icon',
          customCollections: ['local']
        })
      ]
    }),
    icons({
      scale: 1,
      compiler: 'vue3',
      customCollections: {
        local: FileSystemIconLoader('src/assets/icons', svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      }
    })
  ]
}

export default commonConfig
