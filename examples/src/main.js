import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// import VueConfirmDialog from '../../src/index.js'
// Vue.use(VueConfirmDialog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
