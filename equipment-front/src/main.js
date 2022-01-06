import Vue from 'vue'
import { BootstrapVue, CardPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(CardPlugin)
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
