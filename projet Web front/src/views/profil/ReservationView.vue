<template>

    <div class="reservation">
      <h1> Your Reservations </h1>
      
      <div v-for="(reservation, index) in reservations" :key="index">
        <router-link :to="{ name: 'reserv-details', params: {id: reservation.res_id } }">
            <div class="reserv-wrap">
            <ReservationCard>
                <template #sitter> {{  reservation?.sitter_id}}</template>
                <template #date_debut>{{reservation?.date_debut}}</template>
                <template #date_fin>{{reservation?.date_fin}}</template>
                <template #h_debut> {{reservation?.h_debut}}</template>
                <template #h_fin> {{reservation?.h_fin}}</template>
                <template #pet_id> {{reservation?.pet_id}}</template>
                <template #quick_desc>{{reservation?.quick_desc}}</template>
                <template #validation>{{reservation?.validation}}</template>
                

            </ReservationCard>
            </div>
        </router-link>
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

<style scoped>


</style>