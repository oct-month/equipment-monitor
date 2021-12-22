import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: import('@/views/Home')
  },
  {
    path: '/401',
    name: '401',
    component: import('@/views/401')
  },
  {
    path: '/404',
    name: '404',
    component: import('@/views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_URL,
  routes
})

export default router
