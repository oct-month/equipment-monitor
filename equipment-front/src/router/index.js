import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import EquipmentInfo from '@/views/EquipmentInfo.vue'
import Monitoring from '@/views/Monitoring.vue'
import Location from '@/views/Location.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/equipment',
    name: 'EquipmentInfo',
    component: EquipmentInfo
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.VUE_APP_URL,
  routes
})

export default router
