import Vue from "vue";
import App from "./App.vue";
import VueConfirmDialog from ".";

Vue.use(VueConfirmDialog);

Vue.config.productionTip = false;

new Vue({ render: createElement => createElement(App) }).$mount("#app");
