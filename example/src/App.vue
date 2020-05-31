<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <list-confirm />
    <list-confirm-password />
  </div>
</template>

<script>
import ListConfirm from './components/list-confirm.vue'
import ListConfirmPassword from './components/list-confirm-password.vue'

export default {
  name: 'app',
  components: {
    ListConfirm,
    ListConfirmPassword
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
@import url('./assets/base.css');

#app {
  font-family: 'Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 720px;
  padding: 1rem;
  margin: auto;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 5rem;
}
</style>
