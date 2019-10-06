import Vue from "vue";
import App from "./App.vue";
import VueConfirmDialog from ".";
import VueConfirmDialogComponent from "./vue-confirm-dialog.vue";

Vue.use(VueConfirmDialog);
Vue.component("vue-confim-dialog", VueConfirmDialogComponent);

Vue.config.productionTip = false;

new Vue({ render: createElement => createElement(App) }).$mount("#app");
