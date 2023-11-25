import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Aboutview from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/home',
    name:'HomePage',
    component:HomePage,
    meta: {title: "XpertiseScholar 首页"}
  },
  {
    path:'/register',
    name:'RegisterPage',
    component: Aboutview,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
