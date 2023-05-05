<template>

    <div class="reservation">
      <h1> Your Reservations </h1>
      
      <div v-for="(reservation, index) in reservations" :key="index">
        
        <div class="reserv-wrap">

            <button @click="() => accepter(reservation)">Accepter</button>
            <button @click="() => refuser(reservation)">Refuser</button>
   
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
        
      </div> 

    </div>
        

  
  </template>
  
  <script>
  
import ReservationCard from '../../components/icons/profil/ReservationCard.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios'
import router from '../../router';
import { RouterLink,useRoute} from 'vue-router';

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');
export default{
    components:{
        ReservationCard
    },
    setup(){
        const route = useRoute()
        const reservations = ref([]);

        const getReservations = async()=>{
            await axios.get(`/reservations/allreservations2`)
            .then((response)=>{
                reservations.value = response.data
            })
            .catch(err => console.log(err))
        }

        onMounted(()=>{
            getReservations()
            
        })
        return{
            reservations, 
        }

    },
    methods:{
        async accepter(reservation){
            await axios.put(`reservations/validation/${reservation.res_id}`)
            .then(()=>{
                console.log('accepter')
                location.reload()
            })
            .catch(err => console.log(err))
        },
        async refuser(reservation){
            await axios.delete(`/reservations/deleteReservation/${reservation.res_id}`)
            .then(()=>{
                console.log('refuser')
                location.reload()
            })
            .catch(err => console.log(err))
        }
    }
    



}

    

</script>

<style scoped>

.reserv-wrap{
    border: 1px solid black;
}
</style>