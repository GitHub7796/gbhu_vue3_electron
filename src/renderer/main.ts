import { createApp } from 'vue'

import App from '@/renderer/App.vue'
import router from '@/renderer/router'
import pinia from '@/renderer/plugins/pinia'

// Add API key defined in contextBridge to window object type
declare global {
  interface Window {
    mainApi?: any
  }
}

const app = createApp(App)

app.use(router).use(pinia)

app.mount('#app')
