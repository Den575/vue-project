<template>
<div>

  <loader v-if="loading"/>

  <div v-else-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">History</router-link>
      <a @click.prevent class="breadcrumb">
        {{record.type === 'income' ? 'Income':'Outcome'}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card"
        :class="{'red' : record.type === 'outcome', 'green':record.type === 'income'}">
          <div class="card-content white-text">
            <p>Description: {{record.description}}</p>
            <p>Amount: {{record.amount}}</p>
            <p>Category: {{record.categoryName}}</p>

            <small>{{record.date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>No data...</p>
</div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordsById',id)
    const category = await this.$store.dispatch('fetchCategoryById',record.categoryId)
    
    this.loading = false

    this.record = {
      ...record,
      categoryName: category.title
    }
  }
}
</script>