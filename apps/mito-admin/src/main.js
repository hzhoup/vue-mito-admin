import { createApp } from 'vue'
import { setupStore } from '@mito/store'
import { setupRouter } from '@mito/router'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
