import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '../helpers/auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'PublicLayout',
      component:() => import('../views/public/PublicLayout.vue'),
      children:[ 
        {path: '/',name: 'home',component: ()=> import("../views/public/HomeView.vue")},  
        {path:'signUp',name: 'signUp',component: () => import('../views/public/SignUpView.vue')},
        {path:'signIn',name: 'signIn',component: () => import('../views/public/SignInView.vue')},
      ]
    },
    
    {
      path: '/signIn',
      name: 'ProfilLayout',
      component:() => import('../views/profil/ProfilLayout.vue'),
      children:[
        {path:'animal',name: 'animal',component: () => import('../views/profil/animal/AnimalView.vue')},
        {path:'animal/add', name: 'animal-add', component: () => { return import('../views/profil/animal/AddAnimal.vue') }},
        {path:'animal/:id', name:'animal-details', props: true, component:() => import('../views/profil/animal/Animalinfo.vue')},
        {path:'animal/:id/update', name: 'animal-up', props: true, component: () => { return import('../views/profil/animal/updateAnimal.vue') }},
        
        {path:'recherche',name: 'recherche',component: () => import('../views/profil/RechercheView.vue')},
        {path:'recherche/:id', name:'petsitter-details', props:true , component: ()=> import('../views/profil/Petsitterinfo.vue')},
        {path:'recherche/:id/rdv', name: 'petsitter-rdv', props: true, component: () => { return import('../views/profil/RdvView.vue') }},
        
        {path:'profil',name: 'profil',component: () => import('../views/profil/ProfilView.vue')},
        {path:'reservation',name: 'reservation',component: () => import('../views/profil/ReservationView.vue')},
        {path:'reservation/:id', name:'reserv-details', props: true, component:() => import('../views/profil/Reservationinfo.vue')},
      ]
    }  
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.matched[0].name == 'ProfilLayout'){
    console.log('check');
    authGuard();
    console.log('checked');
  }
  next();
})

export default router
