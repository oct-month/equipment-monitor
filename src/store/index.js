import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  new_key = key.replace(/(\.\/|\.js)/g, '')
  modules[new_key] = files(key).default
  modules[new_key]['namespaced'] = true
})

export default new Vuex.Store({
  modules: modules
})
