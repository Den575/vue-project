<template>
  <div class="empty-layout login-background">
    <router-view />
  </div>
</template>

<script>
/*global M*/
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      M.toast({ html: fbError.message });
    }
  }
};
</script>
