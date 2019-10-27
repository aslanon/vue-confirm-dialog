<template>
  <div id="app">
    <vue-confirm />
    <hr />
    <vue-confirm-password />
  </div>
</template>

<script>
import VueConfirm from "./components/vue-confirm.vue";
import VueConfirmPassword from "./components/vue-confirm-password.vue";

export default {
  name: "app",
  components: {
    VueConfirm,
    VueConfirmPassword
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 720px;
  padding:1rem;
  margin: auto;
}
hr {
  opacity: 0.5;
  width: 100%;
  display: block;
}
</style>
