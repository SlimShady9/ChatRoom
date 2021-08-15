import { createApp } from 'vue'
import App from './App.vue'
import VueFinalModal from 'vue-final-modal'
import store from './store'
import router from './router'

import './index.css'


createApp(App)
.use(VueFinalModal())
.use(store)
.use(router)
.mount('#app')
