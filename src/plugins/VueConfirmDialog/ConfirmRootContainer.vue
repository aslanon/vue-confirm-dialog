<template>
  <vue-confirm-dialog
    :isShow="state.show"
    :isAuth="state.auth"
    :isLoading="state.isLoading"
    :message="state.message"
    :button="state.button"
  ></vue-confirm-dialog>
</template>

<script>
import VueConfirmDialog from "./VueConfirmDialog";

export default {
  components: { VueConfirmDialog },
  computed: {
    state() {
      return this.$root.state;
    }
  }
};
</script>
