import { createApp } from 'vue'
import App from './App.vue'

import './registerServiceWorker'
import router from './router'

import './main.scss'
import VueAxios from 'vue-axios'
import axios from 'axios'

createApp(App)
  .use(router)
  .use(VueAxios, axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }))
  .mount('#app')
