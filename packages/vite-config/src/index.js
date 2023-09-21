import { defineConfig, mergeConfig } from 'vite'
import { resolve } from 'node:path'
import commonConfig from './common'

/**
 * @param {import('vite').UserConfig} options
 * @returns {ReturnType<typeof import('vite').defineConfig>}
 */
function defineApplicationConfig(options = {}) {
  return defineConfig(async ({ command }) => {
    const root = process.cwd()
    const isBuild = command === 'build'

    const pathResolve = pathname => resolve(root, '.', pathname)

    /** @type {import('vite').UserConfig} */
    const applicationConfig = {
      esbuild: {
        drop: isBuild ? ['console', 'debugger'] : []
      },
      resolve: {
        alias: [
          {
            find: 'vue',
            replacement: 'vue/dist/vue.runtime.esm-bundler.js'
          },
          {
            find: /@\//,
            replacement: `${pathResolve('src')}/`
          }
        ]
      },
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/_entry-[name]-[hash].js',
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            manualChunks: {
              vue: ['vue', 'pinia', 'vue-router']
            }
          }
        }
      }
    }

    const mergedConfig = mergeConfig(commonConfig, applicationConfig)

    return mergeConfig(mergedConfig, options)
  })
}

export default defineApplicationConfig
