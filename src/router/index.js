import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Aboutview from '../views/AboutView.vue'
import Cookies from 'js-cookie';

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
    name: 'currentUser',
    component: function () {
      return import('../views/user/UserProfile.vue')
    },
    props: route => ({ isVisitor: false }),
  },
  {
    path: '/test',
    name: 'test',
    component: function () {
      return import('../views/TestView.vue')
    }
  },
  {
    path: '/article/:articleId',
    name: 'articleDetail',
    component: function () {
      return import('../views/ArticleDetail.vue')
    }
  },
  {
    path: '/user/:id',
    name: 'otherUser',
    component: function () {
      return import('../views/user/UserProfile.vue')
    },
    beforeEnter: (to, from, next) => {
      const userId = to.params.id;
      if (getCookie()) {
        if (getCookie() === userId) {
          next({ path: '/user' })
        } else
          next()
      }
      else next()
    }
  },
  {
    path: '/user/message',
    name: 'message',
    component: function () {
      return import('../views/user/UserMessage.vue')
    },

  },
  {
    path: '/user/follow',
    name: 'follow',
    component: function () {
      return import('../views/user/UserFollow.vue')
    },
    props: route => ({ isVisitor: false })
  },
  {
    path: '/user/:id/follow',
    name: 'otherFollow',
    component: function () {
      return import('../views/user/UserFollow.vue')
    }
  },
  {
    path: '/user/star',
    name: 'star',
    component: function () {
      return import('../views/user/UserStar.vue')
    },
    props: route => ({ isVisitor: false })
  },
  {
    path: '/user/:id/star',
    name: 'otherStar',
    component: function () {
      return import('../views/user/UserStar.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
function getCookie() {
  const user_info = Cookies.get('user_info');
  if (user_info) {
    const user = JSON.parse(user_info)
    return user.username
  } else return false
}
export default router;


