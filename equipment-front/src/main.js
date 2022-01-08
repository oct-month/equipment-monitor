import Vue from 'vue'
import { BootstrapVue, CardPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Button, message, Form, Menu, Layout, Card, Col, Row, Upload, Input, Icon  } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(CardPlugin)

Vue.use(Button)
Vue.prototype.$message = message
Vue.use(Form)
Vue.use(Upload)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Layout)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])
Vue.component('v-chart', ECharts)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
