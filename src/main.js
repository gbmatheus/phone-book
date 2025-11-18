import 'primeicons/primeicons.css'
import './assets/styles.css'
import './assets/flag.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Noir from './presets/Noir.js'
import appState from './plugins/appState'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      cssLayer: false,
      prefix: 'p',
      darkModeSelector: '.p-dark',
    },
  },
})

app.use(appState)
app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
