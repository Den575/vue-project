<template>
  <div>
    <loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large teal darken-2" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar.vue";
import Sidebar from "../components/app/Sidebar.vue";
import Loader from "../components/Loader.vue";

export default {
  /*global M*/
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar,
    Loader,
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      M.toast({ html: fbError.message });
    },
  },
};
</script>
