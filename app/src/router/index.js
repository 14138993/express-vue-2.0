import Vue from 'vue'
import VueRouter from 'vue-router'
import movie from '../movie/index.vue'
import movieIndex from '../movie/subpage/index.vue'
import Detile from '../movie/subpage/detile.vue'
import list from '../movie/subpage/list.vue'
import admin from '../movie/subpage/admin.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: movie,
      children: [
        {
          path: '/',
          component: movieIndex
        },
        {
          path: 'detile',
          component: Detile
        },
        {
          path: 'list',
          component: list
        },
        {
          path: 'admin',
          component: admin
        }
      ]
    }
  ]
})
export default router
