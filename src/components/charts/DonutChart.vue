<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "doughnutChart",
  extends: Doughnut,
  props: {
    chartType: {
      type: String
    }
  },
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
          label: "Przychody i wydatki",
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === this.chartType) {
                total += +r.amount;
              }
              return total;
            }, 0);
          }),
          backgroundColor: [
            "rgba(0, 82, 155, 0.9)",
            "rgba(0, 124, 195, 0.9)",
            "rgba(122, 193, 66, 0.9)",
            "rgba(55, 123, 43, 0.9)",
            "rgba(253, 187, 47, 0.9)",
            "rgba(244, 122, 31, 0.9)",
            "rgba(255, 91, 0, 0.9)",
            "rgba(184, 0, 40, 0.9)",
            "rgba(132, 0, 46, 0.9)",
            "rgba(59, 15, 66, 0.9)"
          ],
          borderColor: [
            "rgba(0, 82, 155, 1)",
            "rgba(0, 124, 195, 1)",
            "rgba(122, 193, 66, 1)",
            "rgba(55, 123, 43, 1)",
            "rgba(253, 187, 47, 1)",
            "rgba(244, 122, 31, 1)",
            "rgba(255, 91, 0, 1)",
            "rgba(184, 0, 40, 1)",
            "rgba(132, 0, 46, 1)",
            "rgba(59, 15, 66, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
    this.loading = false;
  }
};
</script>
