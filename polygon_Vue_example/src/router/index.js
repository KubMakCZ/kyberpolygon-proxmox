import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import ScenarioDetail from '@/views/ScenarioDetail.vue'
import AdminView from '@/views/AdminView.vue'

const routes = [
  { path: '/user', component: UserView },
    { path: '/scenar/:id', component: ScenarioDetail },
    { path: '/admin', component: AdminView },
    { path: '/', redirect: '/user' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
