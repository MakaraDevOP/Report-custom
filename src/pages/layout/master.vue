<template>
  <div style="width: 100vw; height: 100vh" class="flex flex-row">
    <Siade></Siade>
    <div class="w-full border" style="height: 100vh !important">
      <Header></Header>
      <div class="w-full" style="height: calc(100vh - 3rem);">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Siade from "./../../components/sidebar.vue";
import Header from "./../../components/header.vue";
export default {
  components: { Siade, Header },
};
</script>

<style>
</style>