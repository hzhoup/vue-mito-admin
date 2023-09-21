import { createApp } from 'vue'
import { setupStore } from '@mito/store'
import { setupRouter } from '@mito/router'
import { setupAssets } from '@mito/assets'
import App from './App.vue'

async function bootstrap() {
  setupAssets()

  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
