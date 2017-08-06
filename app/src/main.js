// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios  from 'axios'
import Http from './http/index'
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
Vue.prototype.$http =http;
// Vue.use(axios);
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
