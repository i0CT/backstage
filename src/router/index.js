import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

//配置路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的网址
  //from 代表从哪个路径跳转过来
  //next 函数，表示放行
  // next('/login)强制跳转到 /login
  if(to.path === '/login') return next();
  //根据token判断是否登录，或登录过期
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('login');
  next(); 
})

export default router
