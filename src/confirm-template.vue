<template>
  <vue-confirm-dialog
    :isShow="state.isShow"
    :isLoading="state.isLoading"
    :isAuth="dialog.auth"
    :title="dialog.title"
    :message="dialog.message"
    :button="dialog.button"
  ></vue-confirm-dialog>
</template>

<script>
import VueConfirmDialog from "./vue-confirm-dialog";

export default {
  components: { VueConfirmDialog },
  computed: {
    state() {
      return this.$root.state;
    },
    dialog() {
      return this.$root.dialog;
    }
  }
};
</script>
