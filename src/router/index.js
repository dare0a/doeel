import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '@/components/Test.vue'
import RecentlyClosed from '@/components/RecentlyClosed.vue'
import ChartsView from '@/components/ChartsView.vue'
import Settings from '@/components/Settings.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Test',
    component: Test
  },
  {
    path: '/tasks',
    name: 'RecentrlyClosed',
    component: RecentlyClosed,
  },
  {
    path: '/charts',
    name: 'ChartsVuew',
    component: ChartsView,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
