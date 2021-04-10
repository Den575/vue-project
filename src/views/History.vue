<template>
  <div>
    <div class="page-title">
      <h3>Historia</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      Jeszcze nic nie ma...
      <router-link to="/record">Dodaj nowy</router-link>
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
import {Bar} from 'vue-chartjs'

export default {
  name: 'history',
  mixins: [paginationMixin],
  extends: Bar,
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.renderChart({
      labels: categories.map(c => c.title),
      datasets: [
        {
          label: 'Wydatki',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
        },
        {
          label: 'Przychody',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'income') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }
      ],
    })

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
    HistoryTable
  }
}
</script>