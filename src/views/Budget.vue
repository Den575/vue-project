<template>
  <div>
    <div class="page-title">
      <h3>Planowanie budżetu</h3>
      <h4>{{ info.bill | currency("PLN") }}</h4>
    </div>

    <loader v-if="loading" />
    <p class="center" v-else-if="categories.length == 0">
      Pusto... <router-link to="/categories">Dodaj nową kategorię</router-link>
    </p>

    <section v-else>
      <BarChart />

      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency("PLN") }} of {{ cat.limit | currency("PLN") }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "../components/charts/BarChart";

export default {
  name: "planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .reduce((total, record) => {
          if (record.type === "outcome") {
            return (total += record.amount);
          } else if (record.type === "income") {
            return (total -= record.amount);
          }
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      console.log("Color: " + progressPercent);

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend
      };
    });
    this.loading = false;
  },
  components: {
    BarChart
  }
};
</script>
