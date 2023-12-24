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
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
  },
  // {
  //   path: '/user/:id',
  //   name: 'otherUser',
  //   component: function () {
  //     return import('../views/user/User.vue')
  //   },
  //   beforeEnter: (to, from, next) => {
  //     const userId = to.params.id;
  //     if (getCookie()) {
  //       console.log(userId)
  //       console.log(getCookie())
  //       if (getCookie() == userId) {
  //         next({ path: '/user' })
  //       } else {
  //         next()
  //       }
  //     }
  //     else next()
  //   },
  //   children: [
  //     {
  //       path: '', component: function () {
  //         return import('../components/UserProfile/MapProfile.vue')
  //       }
  //     },
  //     {
  //       path: '/user/:id/follow',
  //       name: 'otherFollow',
  //       component: function () {
  //         return import('../components/UserProfile/Follow.vue')
  //       }
  //     },
  //     {
  //       path: '/user/:id/star',
  //       name: 'otherStar',
  //       component: function () {
  //         return import('../components/UserProfile/Star.vue')
  //       }
  //     },
  //   ]
  // },
  { 
    path: '/user/:id',
    name: 'user',
    key: route => route.params.id,
    component: function () {
      return import('../views/user/User.vue')
    },
    props: route => ({ isVisitor: false }),
    children: [
      {
        name: 'map',
        path: '',
        component: function () {
          return import('../components/UserProfile/MapProfile.vue')
        },
        key: route => route.params.id,
      },
      {
        name: 'follow',
        path: 'follow',
        component: function () {
          return import('../components/UserProfile/Follow.vue')
        },
        key: route => route.params.id,
      },
      {
        path: 'star',
        name: 'star',
        component: function () {
          return import('../components/UserProfile/Star.vue')
        },
        props: route => ({ isVisitor: false }),
        key: route => route.params.id,
      },
      {
        path: 'message',
        name: 'message',
        component: function () {
          return import('../components/UserProfile/Message.vue')
        },
        key: route => route.params.id,
      },
      {
        path: 'starlist/:starId',
        name: 'starList',
        component: () => import('../components/UserProfile/star-post.vue'),
        props: true
      }
    ]
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


  // {
  //   path: '/user/follow',
  //   name: 'follow',
  //   component: function () {
  //     return import('../views/user/UserFollow.vue')
  //   },
  //   props: route => ({ isVisitor: false })
  // },

  // {
  //   path: '/user/star',
  //   name: 'star',
  //   component: function () {
  //     return import('../views/user/UserStar.vue')
  //   },
  //   props: route => ({ isVisitor: false })
  // },
  // {
  //   path: '/user/:id/star',
  //   name: 'otherStar',
  //   component: function () {
  //     return import('../views/user/UserStar.vue')
  //   }
  // },
  {
    path: '/author/:authorId',
    name: 'Author',
    component: function () {
      return import('../views/author/AuthorView.vue')
    }
  },
  // 搜索详情页面，后续可能会调整其位置
  {
    path: '/search-detail',
    name: 'SearchDetail',
    component: () => import('../views/search/SearchDetail.vue'),
  },
  // 高级搜索详情页面，后续可能会调整其位置
  {
    path: '/advance-search-detail',
    name: 'AdvanceSearchDetail',
    component: () => import('../views/search/AdvSearchDetail.vue'),
  },
  // {
  //   path: '/starlist/:starId',
  //   name: 'starList',
  //   component: () => import('../views/user/UserStarDetail.vue'),
  //   props: true
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
function getCookie() {
  const user_info = Cookies.get('user_info');
  if (user_info) {
    const user = JSON.parse(user_info)
    return user.id
  } else return false
}
export default router;


