<template>
  <div>
    <div class="page-title">
      <h3>Historia</h3>
    </div>

    <div>
      <h3> Wydatki </h3>
      <PieChart chartType="outcome"/>
    </div>

    <div>
      <h3> Przychody </h3>
      <PieChart chartType="income"/>
    </div>

    <loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Pusto...
      <router-link to="/record">Dodaj nowy wpis</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Poprzednia strona'"
        :next-text="'Kolejna strona'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
        v-model="page"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import paginationMixin from '../mixsins/pagination.mixin'
import PieChart from '../components/charts/PieChart';

export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records = this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Przychody' : 'Wydatki'
        }
      }))
    }
  },
  components: {
    HistoryTable,
    PieChart
  }
}
</script>