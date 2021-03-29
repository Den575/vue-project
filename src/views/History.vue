<template>
    <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>

  <loader v-if="loading"/>

 <p class="center" v-else-if="!records.length">
      No data...
      <router-link to="/record">Add new</router-link>
    </p>
  <section v-else>
    <HistoryTable :records="items"/>
    <paginate :page-count="pageCount"
  :click-handler="pageChangeHandler"
  :prev-text="'Poprzednia strona'"
  :next-text="'Kolejna strona'"
  :container-class="'pagination'"
  :page-class="'waves-effect'"
  v-model="page"/>
  </section>
</div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import paginationMixin from '../mixsins/pagination.mixin' 

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.setupPagination(this.records = this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Przychody' : 'Wydatki'
      }
    }))
    this.loading = false
  },
  components: {
    HistoryTable
  }
}
</script>