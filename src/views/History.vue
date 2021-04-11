<template>
  <div>
    <div class="page-title">
      <h3>Historia</h3>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Pusto...
      <router-link to="/record">Dodaj nowy wpis</router-link>
    </p>
    <section v-else>
      <div
        style="height: 360px; width: 45%;display:inline-block;"
        v-if="records.length > 1"
      >
        <h5 class="center">Wydatki</h5>
        <DonutChart chartType="outcome" />
      </div>

      <div
        style="height: 360px; width: 45%;display:inline-block;"
        v-if="records.length > 1"
      >
        <h5 class="center">Przychody</h5>
        <DonutChart chartType="income" />
      </div>

      <HistoryTable :records="items" />
      <paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Poprzednia'"
        :next-text="'Kolejna'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        v-model="page"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";
import paginationMixin from "../mixsins/pagination.mixin";
import DonutChart from "../components/charts/DonutChart";

export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        (this.records = this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Przychody" : "Wydatki"
          };
        }))
      );
    }
  },
  components: {
    HistoryTable,
    DonutChart
  }
};
</script>
