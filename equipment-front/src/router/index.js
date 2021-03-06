import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import EquipmentInfo from '@/views/EquipmentInfo.vue'
import Platform from '@/views/Platform.vue'
import Monitoring from '@/views/Monitoring.vue'
// import Location from '@/views/Location.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/platform'
  },
  {
    path: '/equipment',
    name: 'EquipmentInfo',
    component: EquipmentInfo
  },
  {
    path: '/platform',
    name: 'Platform',
    component: Platform
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: Monitoring
  },
  // {
  //   path: '/location',
  //   name: 'Location',
  //   component: Location
  // },
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
  routes
})

export default router
