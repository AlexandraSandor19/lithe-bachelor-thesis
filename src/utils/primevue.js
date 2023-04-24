import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"
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
import Chip from 'primevue/chip';
import VirtualScroller from 'primevue/virtualscroller';
import Toast from 'primevue/toast';
import Menu from 'primevue/menu';

const bindPrimevueComponents = (app) => {
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
    app.component('Chip', Chip);
    app.component('VirtualScroller', VirtualScroller);
    app.component('Toast', Toast);
    app.component('Menu', Menu);
}


export default bindPrimevueComponents;