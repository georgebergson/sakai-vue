import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Steps from 'primevue/steps';
import ToastService from 'primevue/toastservice';
import LoaderPlugin from './store/loader';

import '@/assets/styles.scss';
import { ProgressSpinner } from 'primevue';

const app = createApp(App);

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(LoaderPlugin);

app.component('Steps', Steps);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('ProgressSpinner', ProgressSpinner);

app.mount('#app');
