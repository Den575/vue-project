import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch(`https://api.exchangeratesapi.io/latest?symbols=USD%2CEUR%2CPLN&base=PLN`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category
  }
})
