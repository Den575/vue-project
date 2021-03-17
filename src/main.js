import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import 'materialize-css/dist/js/materialize.min'
//import messagePlugin from '../src/utils/message.plugin'


//Vue.use(messagePlugin)
Vue.config.productionTip = false
Vue.use(Vuelidate)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
