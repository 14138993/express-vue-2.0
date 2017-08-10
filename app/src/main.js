// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios  from 'axios'
import Http from './http/index'
import Events from './bus/index'
import store from './vuex/store'
const $axios = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

// 初始化默认post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const http=new Http($.ajax);
// Vue.prototype.$http = new Http(axios);
Vue.prototype.$http = http;
Vue.prototype.EventBus = Events; //将bus通信挂载到原型上便于使用
// Vue.config.productionTip = false

//获取session及路由权限控制
router.beforeEach((to, from, next) => {
    var routeNames=['movieIndex','detileIndex','errorIndex']; 
    http.ajax(res=>{
        Vue.prototype.user=res.data; //将登录的信息挂载到原型其他页面能够直接使用
        if(routeNames.indexOf(to.name)!==-1){
            next();  
        }else{
              if(res.data&& res.data.isAdmin==1){
                  next()
              }else{
                next('/error')
              }                  
        }   
    },'api/user/get-session',{})  
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
