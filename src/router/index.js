import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Aboutview from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: { title: "XpertiseScholar 首页" }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/user',
    name: 'user',
    component: function () {
      return import('../views/user/UserView.vue')
    }
  },
  {
    path: '/test',
    name: 'test',
    component: function () {
      return import('../views/TestView.vue')
    }
  },
  {
    path: '/article',
    name: 'articleDetail',
    component: function () {
      return import('../views/ArticleDetail.vue')
    }
  },
  {
    path: '/user/:id',
    name: 'userProfile',
    component: function () {
      return import('../views/user/UserProfile.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
