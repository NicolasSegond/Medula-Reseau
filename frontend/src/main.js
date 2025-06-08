import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router/router'

import './assets/index.css' // ou ton CSS Tailwind

const app = createApp(App)

app.use(router)

app.mount('#app')
