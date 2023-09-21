import defineApplicationConfig from '@mito/vite-config'

export default defineApplicationConfig({
  server: {
    port: 3030,
    proxy: {
      '/api': {
        ws: true,
        changeOrigin: true,
        target: 'http://localhost:3031',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
