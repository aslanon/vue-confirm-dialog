import Vue from "vue";
import App from "./App.vue";
import VueConfirm from "./plugins/VueConfirmDialog";

Vue.use(VueConfirm);

Vue.config.productionTip = false;

new Vue({ render: createElement => createElement(App) }).$mount("#app");
