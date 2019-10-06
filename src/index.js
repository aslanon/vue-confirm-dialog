import Vue from "vue";

import ConfirmTemplate from "./confirm-template";

const optionsDefaults = {
  data: {
    state: {
      time: 0,
      interval: null,
      isConfirmed: false,
      isLoading: false,
      message: "Message",
      isShow: false,
      isAuth: false,
      button: {
        no: "No",
        yes: "Yes"
      }
    },

    resetState() {
      this.state = {
        isConfirmed: false,
        isLoading: false,
        isShow: false,
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
      this.state.isShow = true;
      if (args && args.message) this.state.message = args.message;
      if (args && args.button) this.state.button = args.button;
      if (args && args.isAuth) this.state.isAuth = true;
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

    const root = new Vue({
      data: { state: options.data.state },
      render: createElement => createElement(ConfirmTemplate)
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
