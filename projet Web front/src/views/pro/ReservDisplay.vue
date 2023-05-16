<template>

    <div class="reservation">
      <h1> Réservations Professionelles </h1>
      
      <div v-for="(reservation, index) in reservations" :key="index">
        
        <div class="reserv-wrap">
            <div class="bouttons">
                <button  @click="() => accepter(reservation)"><span class="material-icons"> check</span></button>
                   
                <button  @click="() => refuser(reservation)"><span class="material-icons"> close</span></button>
            </div>
           
            <div class="la">
                <router-link class="reservation" :to="{ name: 'reserv-details2', params: {id: reservation.res_id } }">
                    <ReservationCard :validation="reservation?.validation">
                        <template #sitter_nom> {{  reservation?.nom}}</template>
                        <template #date_debut>{{reservation?.date_debut}}</template>
                        <template #date_fin>{{reservation?.date_fin}}</template>
                        <template #h_debut> {{reservation?.h_debut}}</template>
                        <template #h_fin> {{reservation?.h_fin}}</template>
                        <template #nom_pet> {{reservation?.nom_pet}}</template>
                        <template #quick_desc>{{reservation?.quick_desc}}</template>
                        <template #validation>{{reservation?.validation}}</template>
                        
                        
                    </ReservationCard>
                </router-link>
            </div>
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

<style scoped lang="scss">
h1{
    font-family: 'Fira sans' ;
    font-size: 2rem;
    text-align: center;
    padding: 2rem;
    color: #582391;
}

.reserv-wrap{
    display: flex;
    justify-content: start;
    flex:1;
    margin: 1rem;
}

button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: mediumpurple ;
    padding: 0.5rem; 
    margin-bottom: 1rem;
    border-radius: 3px;
    width: 100%;
    height: 45%;
    margin: auto;

}
button:hover{
    background-color: var(--primary) ;
}

.bouttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 40px;
}
.la{
    flex:1;
   
    
}
.reservation{
  text-decoration: none;
}

</style>