<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Example />
  </div>
</template>

<script>
import Example from "./components/Example.vue";

export default {
  name: "app",
  components: {
    Example
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
}
</style>
