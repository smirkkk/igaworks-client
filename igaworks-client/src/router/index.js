import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import axios from '../plugins/axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/GameView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {

  let user_id = window.sessionStorage.getItem('user_id');

  if (user_id == null) {
    // 유저 아이디 없는 경우 새로 생성
    user_id = window.guid();
    window.sessionStorage.setItem('user_id', user_id);
  }

  axios.post('collect', {
    user_id: user_id,
    event_id: window.guid(),
    event: 'route_change',
    parameters: JSON.stringify({from: from.path, to: to.path})
  });

  return next();
});

export default router
