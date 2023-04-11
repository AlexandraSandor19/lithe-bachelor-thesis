import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Image from 'primevue/image';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"

app.use(PrimeVue, { ripple: true });
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Password', Password);
app.component('Button', Button);
app.component('Divider', Divider);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('Image', Image);

module.exports = bindPrimevue;