import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import bindPrimevueComponents from './utils/primevue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
bindPrimevueComponents(app)

authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})
