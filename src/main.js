import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from './api/axios'
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false

Vue.use(axios);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')