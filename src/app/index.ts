import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.tsx'
import router from './router'

import './styles.css'

export const app = createApp(App)

app.use(createPinia())
app.use(router)
