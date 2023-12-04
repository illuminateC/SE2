import { createApp } from 'vue'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
import gsap from "gsap";
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWechatTitle from 'vue-wechat-title'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createI18n } from 'vue-i18n'
import CookiesPlugin from './cookies-plugin'
import * as echarts from 'echarts';

const app = createApp(App)
app.use(router).use(store)
app.use(VueAxios, axios)
app.use(CookiesPlugin)
app.use(router).use(store)
app.use(VueAxios, axios)
app.use(gsap)
app.use(ElementPlus)
app.use(VueWechatTitle);

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
