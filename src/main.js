import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue, { ripple: true });
app.component('Card', Card);
app.component('InputText', InputText);
app.use(createPinia())
app.use(router)

app.mount('#app')
