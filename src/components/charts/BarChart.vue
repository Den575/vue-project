<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  name: "barChart",
  extends: Bar,
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.renderChart({
      labels: categories.map(c => c.title),
      datasets: [
        {
          label: "Wydatki",
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === "outcome") {
                total += +r.amount;
              }
              return total;
            }, 0);
          }),
          borderColor: "rgba(204, 0, 0, 2)",
          backgroundColor: "rgba(204, 0, 0, 0.9)",
          borderWidth: 1
        },
        {
          label: "Przychody",
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === "income") {
                total += +r.amount;
              }
              return total;
            }, 0);
          }),
          borderColor: "rgba(0, 112, 0, 1)",
          backgroundColor: "rgba(0, 112, 0, 0.9)",
          borderWidth: 1
        }
      ]
    });

    this.loading = false;
  }
};
</script>
