<template>

<div class="petsitter-vue">
  <h1> Choisis ton Petsitter !</h1>

  <div class="cards">
    <div v-for="(petsitter, index) in petsitters" :key="index">
    <router-link class="element" :to="{ name: 'petsitter-details', params: {id: petsitter.sitter_id } }">
        <PetsitterCard :sexe="petsitter?.sexe">
          <template #nom>{{ petsitter?.nom }} </template>
          <template #prenom>{{ petsitter?.prenom }}</template>
          <template #age>{{ petsitter?.age }}</template>
        </PetsitterCard>
    </router-link>
</div> 

  </div>
        
</div>
</template>
  
<script setup>

import PetsitterCard from '../../components/icons/profil/PetsitterCard.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios'
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


const petsitters= ref([]);

onMounted(async()=>{
    await axios.get('/petsitters/allpetsitters')
        .then((response) => {
            console.log(response);
            petsitters.value = response.data
        })
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


.cards{
  width:90%;
  margin:auto;
  display:grid;
  justify-content: center;
  gap: 2rem;
  position:relative;
  background-image: url('../../images/pattes.jpg');
  background-position: center;
  background-repeat:repeat ;
  background-size: cover;

}

.element{
  text-decoration: none;
}

.cards{
  @media (min-width: 500px){
    grid-template-columns: repeat(3, 1fr);
  
  }
  @media (min-width: 760px){
      grid-template-columns: repeat(4, 1fr);
    
  }
  grid-template-columns: minmax(300px,1fr);
}

</style>
