<template>
  <div style="height: 100vh; width: 100vw">
    <router-view />
  </div>
</template>
 
<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
body {
  overflow-y: hidden; /* Hide vertical scrollbar */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>
