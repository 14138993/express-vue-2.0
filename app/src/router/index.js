import Vue from 'vue'
import VueRouter from 'vue-router'
const  movie = resolve=>require(['../movie/index.vue'],resolve)
const  error = resolve=>require(['../movie/404.vue'],resolve)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      component: movie,
      children: [
        {
          name:'movieIndex',
          path: '/',
          //组件懒加载
          component:resolve=>{
             require.ensure([],require=>{
                resolve(require('../movie/subpage/index.vue'));
            }, "movie/movieIndex");           
          }           
        },
        {
          name:'detileIndex',
          path: 'detile',
          component:resolve=>{
            require.ensure([],require=>{
               resolve(require('../movie/subpage/detile.vue'));
            },'movie/detileIndex')
          }
        },
        {
          name:'listIndex',
          path: 'list',
          component:resolve=>{
              require.ensure([],require=>{
                resolve(require('../movie/subpage/list.vue'));
              },'movie/listIndex')
          }
        },
        {
          name:'adminIndex',
          path: 'admin',
          component:resolve=>{
              require.ensure([],require=>{
                  resolve(require('../movie/subpage/admin.vue'));
              },'movie/adminIndex')
          }
        },
        {
          name:'categoryIndex',
          path: 'category',
          component:resolve=>{
              require.ensure([],require=>{
                  resolve(require('../movie/subpage/category.vue'));
              },'movie/categoryIndex')
          }
        },
        {
          name:'userIndex',
          path: 'user',
          component:resolve=>{
              require.ensure([],require=>{
                  resolve(require('../movie/subpage/user.vue'));
              },'movie/userIndex')
          }
        },              
      ]
    },
    {
      path:'*',
      component:error
    },
    {
      name:'errorIndex',
      path:'/error',
      component:error
    }    
  ],
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      }else if(to.hash){//判断有无锚点
          return {
            selector: to.hash
          }
      }else {
          return { x: 0, y: 0 }
      }
  }  
})


export default router
