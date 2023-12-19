import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';

const routes = [
  {
    path: '/',
    component: ()=>import('../views/search/SearchDetail.vue')
  },
  // 搜索详情页面，后续可能会调整其位置
  {
    path: '/search-detail',
    name: 'SearchDetail',
    component: ()=>import('../views/search/SearchDetail.vue'),
  },
  // 高级搜索详情页面，后续可能会调整其位置
  {
    path: '/advance-search-detail',
    name: 'AdvanceSearchDetail',
    component: ()=>import('../views/search/AdvSearchDetail.vue'),
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


