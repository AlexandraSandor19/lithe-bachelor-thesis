import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"
import bindPrimevueComponents from './utils/primevue';

import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(createPinia());
bindPrimevueComponents(app);

app.use(router);

app.mount('#app');
