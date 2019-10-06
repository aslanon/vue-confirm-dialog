<template>
  <vue-confirm-dialog
    :isShow="state.isShow"
    :isAuth="state.isAuth"
    :isLoading="state.isLoading"
    :message="state.message"
    :button="state.button"
  ></vue-confirm-dialog>
</template>

<script>
import VueConfirmDialog from "./vue-confirm-dialog";

export default {
  components: { VueConfirmDialog },
  computed: {
    state() {
      return this.$root.state;
    }
  }
};
</script>
