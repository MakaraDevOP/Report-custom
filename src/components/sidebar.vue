<template>
  <div
    class="bg-blue-400"
    :class="{
      'side-bar-visible': sideBarVisible,
      'side-bar-close': !sideBarVisible,
    }"
    id="side-bar"
  >
    this is side bar
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideBarVisible: false,
    };
  },
  computed: {},
};
</script>

<style>
#side-bar {
  overflow: hidden;
  transition: 300ms;
}
.side-bar-visible {
    width: 300px !important;
}
.side-bar-close {
    width: 0px !important;
}
</style>