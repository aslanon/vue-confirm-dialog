import Vue from 'vue'
import App from './App.vue'
import clickoutside from '@/directives/clickoutside'

import VueConfirmDialog from '.'
Vue.use(VueConfirmDialog)

Vue.directive('clickoutside', clickoutside)

Vue.config.productionTip = false

new Vue({
  render: createElement => createElement(App)
}).$mount('#app')
