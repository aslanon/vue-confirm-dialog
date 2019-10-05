<template>
  <vue-confirm
    :isShow="state.show"
    :isAuth="state.auth"
    :isLoading="state.isLoading"
    :message="state.message"
    :button="state.button"
  ></vue-confirm>
</template>

<script>
import VueConfirm from './VueConfirm'

export default {
  components: { VueConfirm },
  computed: {
    state() {
      return this.$root.state
    }
  }
}
</script>
