<template>
    <div>
        <h1> Reserv details </h1>

        <button @click="supprimer">Supprimer</button>
        
        

        <p> Date de debut:  {{reservation.date_debut}}</p>
        <p> Date de fin:    {{reservation.date_fin}} </p>
        <p> Heure de debut: {{reservation.h_debut}} </p>
        <p> Heure de fi     {{reservation.h_fin}} </p>
        <p> Id petsitter:   {{reservation.sitter_id}}</p>
        <p> Animal concerné:{{reservation.pet_id}} </p>
        <p> Description:    {{reservation.quick_desc}} </p>
        <p> Validation:     {{reservation.validation}} </p>
        

    </div>


</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from '../../router';
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


export default {
 
  setup() {
    const route = useRoute()
    const routeParams = reactive({
      id: route.params.id
    })
    
    const reservation = ref({});
    

    onMounted(() => {
      axios.get(`/reservations/getReservation/${routeParams.id}`)
      .then((response) => {
        reservation.value = response.data
        })
    })

   const supprimer = ()=>{
      axios.delete(`reservations/deleteReservation/${routeParams.id}`)
      .then(response => {
        console.log('Item deleted:', response.data);
        router.push('/signIn/reservation')
      })
      .catch(error => {
        console.error('Error deleting item:', error);
    
      });

   }
    

    return {
      id: routeParams.id,
      reservation,
      supprimer,
      
      
      
    }
  }
}
</script>