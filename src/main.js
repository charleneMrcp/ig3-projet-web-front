import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from "axios"


axios.defaults.baseURL = import.meta.env.VITE_BACK_END_URI;



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
