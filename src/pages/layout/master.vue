<template>
  <div class="flex flex-row">
    <Siade></Siade>
    <div class="w-full border">
      <Header></Header>
      <div class="w-full h-full" style="height: calc(100vh - 3rem)">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Siade from "./../../components/sidebar.vue";
import Header from "./../../components/header.vue";
export default {
  components: {Siade, Header},
};
</script>

<style></style>
