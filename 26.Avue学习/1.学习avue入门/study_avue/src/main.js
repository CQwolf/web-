import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入avue
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入公共样式
import  './assets/public.css';

Vue.use(Avue);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
