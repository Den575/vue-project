import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import currencyFilter from './filters/currency.filter'
import Loader from './components/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
//import messagePlugin from '../src/utils/message.plugin'


//Vue.use(messagePlugin)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.filter('currency',currencyFilter)
Vue.component('Loader', Loader)


firebase.initializeApp({
  apiKey: "AIzaSyD6xAyeiYfbc0FbWXcHRUtn5IdZPbzh0no",
  authDomain: "vue-project-2f9db.firebaseapp.com",
  projectId: "vue-project-2f9db",
  storageBucket: "vue-project-2f9db.appspot.com",
  messagingSenderId: "27409433475",
  appId: "1:27409433475:web:e048e7b9a4a91044746cb6",
  measurementId: "G-M3ZXWV1HJ4"
})

let app

firebase.auth().onAuthStateChanged(()=> {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
