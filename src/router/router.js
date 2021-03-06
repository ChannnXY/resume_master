import Vue from 'vue'
import vueRouter from 'vue-router'
import { store } from "../store/index";
Vue.use(vueRouter);

const router = new vueRouter({
    mode:'history',
    base:'/evaluation/',
    routes:[
        {path:'/',redirect:'/index'},
        {path:'/login',component:()=>import('../components/login.vue'),name:'login'},
        {path:'/index',component:()=>import('../components/index.vue'),name:'index'},
    ]
})

// 路由守卫，检测登录状态
router.beforeEach((to,from,next)=>{
    document.title = to.meta.title || "综测管理系统";
    if(store.state.login.token||to.name=='login'){
        // 如果token没有，即未登录，或者是要进入登录页面的
        next()
    }else{
        next({
            path:'/login'
        })
        next()
    }
})

export default router;