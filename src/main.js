import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue, { ripple: true });
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Password', Password);
app.component('Button', Button);
app.component('Divider', Divider);
app.use(createPinia())
app.use(router)

app.mount('#app')
