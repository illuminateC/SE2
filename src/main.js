import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import CookiesPlugin from './cookies-plugin'
const app = createApp(App)
app.use(router).use(store)
app.use(VueAxios, axios)
app.use(CookiesPlugin)

app.mount("#app")
// createApp(App).use(store).use(router).mount('#app')
