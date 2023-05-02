import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/signIn/animal',
      name: 'animal',
      component: () => import('../views/profil/AnimalView.vue') // à modifier
    },
    {
      path:'/signUp',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path:'/signIn',
      name: 'signIn',
      component: () => import('../views/SignInView.vue')
    },
    {
      path:'/signIn/recherche',
      name: 'recherche',
      component: () => import('../views/profil/RechercheView.vue')
    },
    {
      path:'/signIn/profil',
      name: 'profil',
      component: () => import('../views/profil/ProfilView.vue')
    },
    {
      path:'/signIn/reservation',
      name: 'reservation',
      component: () => import('../views/profil/ReservationView.vue')
    }

  ]
})

export default router
