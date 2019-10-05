import Vue from "vue";

import ConfirmRootContainer from "./ConfirmRootContainer";

const optionsDefaults = {
  data: {
    // Hash object of all elements that can be commented on
    state: {
      time: 0,
      interval: null,
      isConfirmed: false,
      isLoading: false,
      type: "select",
      message: "Message",
      show: false,
      auth: false,
      button: {
        no: "No",
        yes: "Yes"
      }
    },

    resetState() {
      this.state = {
        isConfirmed: false,
        isLoading: false,
        show: false,
        time: 0
      };
    },

    close() {
      clearInterval(this.state.interval);
      this.resetState();
    },

    updateConfirm() {
      this.state.isConfirmed = true;
      this.state.isLoading = true;
    },

    isConfirm() {
      return this.state.isConfirmed;
    },

    async confirm(args, callback) {
      this.state.show = true;
      if (args && args.message) this.state.message = args.message;
      if (args && args.button) this.state.button = args.button;
      if (args && args.auth) this.state.auth = true;
      await this.callback().then(resp => {
        if (callback) callback(resp);
      });
    },

    async callback() {
      return new Promise((resolve, reject) => {
        this.state.interval = setInterval(() => {
          this.state.time += 1;
          if (this.state.isConfirmed) {
            resolve(this.state.isConfirmed);
            clearInterval(this.state.interval);
          }
          if (this.state.time > 120) {
            clearInterval(this.state.interval);
            resolve(false);
            this.close();
          }
        }, 500);
      });
    }
  }
};

export default {
  install(vue, opts) {
    const options = { ...optionsDefaults, ...opts };
    // Fun will happen here

    const root = new Vue({
      data: { state: options.data.state },
      render: createElement => createElement(ConfirmRootContainer)
    });

    // Mount root Vue instance on new div element added to body
    root.$mount(document.body.appendChild(document.createElement("div")));
    root.callback = options.data.callback;

    root.isConfirm = options.data.isConfirm;
    root.resetState = options.data.resetState;
    root.confirm = options.data.confirm;
    root.close = options.data.close;
    root.$on("close", options.data.close);
    root.$on("save", options.data.updateConfirm);
    // Make the root instance available in all components
    vue.prototype.$vueConfirm = root;
  }
};
