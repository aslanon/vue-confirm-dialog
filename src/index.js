import Vue from 'vue'

import ConfirmTemplate from './confirm-template'
import VueConfirmDialog from './vue-confirm-dialog.vue'

const optionsDefaults = {
  data: {
    state: {
      isShow: false,
      isConfirmed: false,
      isLoading: false,
      isNoClicked: false,
      time: 0,
      interval: null,
      password: null
    },

    dialog: {
      auth: false,
      title: 'Confirm',
      message: 'Message',
      button: {
        no: 'No',
        yes: 'Yes'
      }
    },

    /**
     * Set vue-confirm state from JS props.
     *
     * @param {Object} args
     * @param {Function} callback
     */
    async confirm(args, callback) {
      this.state.isShow = true
      Object.keys(args).forEach(item => {
        args[item] || this.dialog[item]
          ? (this.dialog[item] = args[item])
          : null
      })
      await this.callback().then(resp => {
        if (typeof callback == 'function') {
          callback(resp, this.state.password)
          this.resetState()
        }
      })
    },

    /**
     * When user click to confirm button,
     * this action resolved in callback function
     * and action passing to confirm function
     */
    async callback() {
      return new Promise(resolve => {
        this.state.interval = setInterval(() => {
          this.state.time += 1
          if (this.state.isConfirmed) {
            clearInterval(this.state.interval)
            resolve(true)
          }
          if (this.state.isNoClicked) {
            clearInterval(this.state.interval)
            resolve(false)
            this.close()
          }
          if (this.state.time > 120) {
            clearInterval(this.state.interval)
            resolve(false)
            this.close()
          }
        }, 500)
      })
    },

    resetState() {
      this.state = {
        isConfirmed: false,
        isLoading: false,
        isShow: false,
        isNoClicked: false,
        time: 0,
        password: null
      }
    },

    close() {
      this.state.isNoClicked = true
    },

    _close() {
      clearInterval(this.state.interval)
      this.resetState()
    },

    updateConfirm() {
      this.state.isConfirmed = true
      this.state.isLoading = true
    },

    isConfirm() {
      return this.state.isConfirmed
    },

    setPassword(password) {
      if (password) this.state.password = password
    }
  }
}

export default {
  install(vue, opts) {
    const options = { ...optionsDefaults, ...opts }

    Vue.component('vue-confirm-dialog', VueConfirmDialog)

    Vue.directive('focus', {
      inserted: function(el) {
        el.focus()
      }
    })

    const root = new Vue({
      data: { state: options.data.state, dialog: options.data.dialog },
      render: createElement => createElement(ConfirmTemplate)
    })

    // Mount root Vue instance on new div element added to body
    root.$mount(document.body.appendChild(document.createElement('div')))
    root.callback = options.data.callback
    root.isConfirm = options.data.isConfirm
    root.resetState = options.data.resetState
    root.confirm = options.data.confirm
    root.close = options.data._close
    root.$on('setPassword', options.data.setPassword)
    root.$on('close', options.data.close)
    root.$on('save', options.data.updateConfirm)

    // Make the root instance available in all components
    vue.prototype.$vueConfirm = root
  }
}
