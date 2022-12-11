import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import AddLink from '../views/AddLink.vue'
import Redirect from '../views/Redirect.vue'
import NotFound from '../views/NotFound.vue'
import LogOut from '../views/LogOut.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/create',
      component: AddLink
    },
    {
      path: '/:customPath',
      name: 'customPath',
      component: Redirect
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOut
    },
  ]
})

export default router
