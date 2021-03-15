import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import Detail from '../views/Detail.vue'
import History from '../views/History.vue'
import Planning from '../views/Planning.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Record from '../views/Record.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: Register
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: History
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main'},
    component: Record
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: Profile
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main'},
    component: Planning
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main'},
    component: Categories
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {layout: 'main'},
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
