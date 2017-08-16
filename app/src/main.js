import Vue from 'vue'
import App from './App'
import router from './router'
import axios  from 'axios'
import Http from './http/index'
import Events from './bus/index'
import store from './vuex/store'

import Validator from 'vue-validator'

Vue.use(Validator);
//注册自定义内容
// 通用方法/组件
import Common from './commons/global/common'
Vue.use(Common)
// 暂无自定义全局指令
// import directive from './commons/global/directive.js'
// Vue.use(directive)

// 自定义全局过滤器
import filter from './commons/global/filter'
Vue.use(filter)
// 自定义的全局验证
import validator from './commons/global/validator'
Vue.use(validator)




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
    if(!store.state.user.userMsg){
      http.ajax(res=>{
          // Vue.prototype.user=res.data; 
          store.dispatch('user/updataUser',res.data) //将登录的信息报存到vuex
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
    }else{
      next();
    } 
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
