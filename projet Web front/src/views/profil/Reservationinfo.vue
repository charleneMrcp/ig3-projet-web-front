<template>
    <h1> Details de la réservation </h1>
    <div class="infos">
        <div class="global">

          <div class="haut">
            <div class="reserv-image">
              <img class="image" :src="reservation.validation === true ? '/src/images/valider.png' : '/src/images/nonvalider.png'" alt="Image de l'etat de la reservation"> 
            </div>

            <div class="identite">
              <div class="boitea">
                <h3>Nom petsitter:</h3>
                <p>{{reservation.nom}}</p>
              </div>
              <div class="boitea">
                <h3>Animal concerné:</h3>
                <p> {{reservation.nom_pet}} </p>
              </div>
            </div>

          </div>
          


          <div class="informations">
            <div class="gauche">
              <div class="boite">
                <h3>Date de debut:</h3>
                <p>{{reservation.date_debut}}</p>
              </div>
              <div class="boite">
                <h3>Date de fin:</h3>
                <p>{{reservation.date_fin}} </p>
              </div>
            </div>

            <div class="droite">
              <div class="boite">
                <h3>Heure de debut:</h3>
                <p>  {{reservation.h_debut}} </p>
              </div>
              <div class="boite">
                <h3>Heure de fin:</h3>
                <p>{{reservation.h_fin}} </p>
              </div>

            </div>
          </div>
          <div class="desc">
            <h3>Description:</h3>
            <p>{{reservation.quick_desc}} </p>
          </div>
        </div>
        <div class="sep"></div>
        <button @click="supprimer">Supprimer</button>
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

<style scoped lang="scss">
.identite{
  display: flex;
  flex-direction: column;
}
.global{
  width: 60%;
  margin: auto;
  background-color: rgb(235, 234, 234);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: column;
    h3{
      width:10rem;
      color:#582391;
      font-size: 1rem;
      font-family: 'Fira sans'; 
    }
    p{
      max-width: 8rem;
      color: grey;
      font-family: 'Fira sans'; 
      font-size: 1rem;
    }
    
    
}
.boitea{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    h3{
      width:10rem;
      color:#582391;
      font-size: 1rem;
      font-family: 'Fira sans'; 
    }
    p{
      max-width: 8rem;
      color: grey;
      font-family: 'Fira sans'; 
      font-size: 1rem;
    }
    
    
}
h1{
    text-align: center;
    color: #582391;
    font-family: 'Fira sans';  
    margin:1rem;
    padding-bottom: 2rem;
}

button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    margin:auto;
    width:6rem;
}

button:hover{
    background-color: mediumpurple ;
}
.informations{
  margin:2rem;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  
}
.haut{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  flex-wrap: wrap;
  align-items: center;
}
.image{
    width:7rem;
    height: auto;
    display:inline;
    margin-bottom: 1rem;
    padding-top: 1rem;
}
.desc{
  width: 80%;
  margin: auto;
  text-align: center;
  display: flex  ;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 2rem;
  h3{
    color: #582391;
    font-family: 'Fira sans'; 
    
  }
  p{
      max-width: 8rem;
      color: grey;
      font-family: 'Fira sans'; 
      font-size: 1rem;
      
      width: 100%;
    }
}
.infos{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.sep{
  height: 1rem;
}
.reserv-image{
  margin-top:1rem;
  border: 3px dotted grey;
  border-radius: 3px;
  width: 13rem;
  display: flex;
  justify-content: center;
}
</style>