import { createApp } from 'vue'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
// import gsap from "gsap";
import {gsap, ScrollTrigger} from 'gsap/all'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWechatTitle from 'vue-wechat-title'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createI18n } from 'vue-i18n'
import CookiesPlugin from './cookies-plugin'
import VueCropper from 'vue-cropper';
import naive from 'naive-ui'
import 'vue-cropper/dist/index.css'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
import * as echarts from 'echarts';
import { createPinia } from 'pinia';
// import 'echarts-gl'
const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
app.use(router).use(store)
app.use(VueAxios, axios)
app.use(CookiesPlugin)
app.use(router).use(store)
app.use(VueAxios, axios)
app.use(gsap)
app.use(ElementPlus)
app.use(VueCropper)
app.use(naive)
app.use(VueWechatTitle);
app.provide('$axios',axios)
app.use(echarts)

gsap.registerPlugin(ScrollTrigger)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const messages = {
  en: {
    message: {
      login: 'Login',
      register: 'Register',
      settle: 'Settle on the platform',
      portal: 'Portal',
      personal: 'Personal Center',
      admin: 'Administrator',
      language: 'Switch languages',
      logout: 'Logout'
    }
  },
  cn: {
    message: {
      login: '登录',
      register: '注册',
      settle: '入驻平台',
      portal: '我的门户',
      personal: '个人中心',
      admin: '管理员',
      language: '切换语言',
      logout: '退出'
    }
  }
}
// 使用选项创建i18n实例
const i18n = createI18n({
  locale: 'cn', // 当前语言
  fallbackLocale: 'en', // 回退语言
  messages,
  legacy: false,
})
app.use(i18n)
app.mount("#app")
// createApp(App).use(store).use(router).mount('#app')
