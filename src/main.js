import Vue from 'vue'
import App from './App.vue'

import VueConfirmDialog from './index'
Vue.use(VueConfirmDialog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
