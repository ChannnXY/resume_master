import Vue from 'vue'
import App from './App.vue'


import ElementUI  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 节点隐藏
import 'element-ui/lib/theme-chalk/display.css';
// fade/zoom 等动画效果
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import collapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(collapseTransition);

new Vue({
  render: h => h(App),
}).$mount('#app')
