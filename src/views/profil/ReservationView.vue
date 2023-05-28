<template>

    <div class="reservation">
      <h1> Mes Réservations </h1>
      
      <div class="cartes">
        <div v-for="(reservation, index) in reservations" :key="index">
          <router-link class="reservation" :to="{ name: 'reserv-details', params: {id: reservation.res_id } }">
            
            <ReservationCard :validation="reservation?.validation">
                <template #sitter_nom> {{  reservation?.nom}}</template>
                <template #sitter_prenom> {{  reservation?.prenom}}</template>
                <template #date_debut>{{reservation?.date_debut}}</template>
                <template #date_fin>{{reservation?.date_fin}}</template>
                <template #h_debut> {{reservation?.h_debut}}</template>
                <template #h_fin> {{reservation?.h_fin}}</template>
                <template #nom_pet> {{reservation?.nom_pet}}</template>
                

            </ReservationCard>
            
          </router-link>
        </div>
      </div> 

    </div>
        

  
  </template>
  
  <script setup>
  
import ReservationCard from '../../components/icons/profil/ReservationCard.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios'
import router from '../../router';
import { RouterLink,useRoute} from 'vue-router';

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

const route = useRoute()
const reservations = ref([]);

const getReservations = async()=>{
    await axios.get(`/reservations/allreservations`)
    .then((response)=>{
        reservations.value = response.data
    })
    .catch(err => console.log(err))
}



onMounted(()=>{
    getReservations()
})
    

</script>

<style scoped lang="scss">

h1{
    font-family: 'Fira sans' ;
    font-size: 2rem;
    text-align: center;
    padding: 2rem;
    color: #582391;
}
.cartes{
    width:90%;
    
    margin:auto;
    display:grid;
    justify-content: center;
    gap: 2rem;
    position:relative;
    
}
.cartes{

  grid-template-columns: 1fr;
}
.reservation{
  text-decoration: none;
}

</style>