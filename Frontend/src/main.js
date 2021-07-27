import { createApp } from 'vue'
import App from './App.vue'
import VueFinalModal from 'vue-final-modal'
import store from './store'
import './index.css'


createApp(App).use(VueFinalModal()).use(store).mount('#app')
