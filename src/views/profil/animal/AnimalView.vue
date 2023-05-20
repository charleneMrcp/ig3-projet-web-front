<template>

    <div class="animal-vue">
      <h1> Voici vos compagnons !</h1>


      <div class="new">
         <router-link class="material-icons" :to="{name: 'animal-add'}">add</router-link>
      </div>
      <div class="cartes">
        <div v-for="(animal, index) in animals" :key="index">
            <router-link class="animal" :to="{ name: 'animal-details', params: {id: animal.pet_id } }">
                <AnimalCard :type="animal?.type">
                    <template #nom>{{ animal?.nom_pet }}</template>
                    <template #type>{{ animal?.type }}</template>
                </AnimalCard>
            </router-link>
         </div> 


      </div>
      
    </div>

</template>
      
<script setup>

import AnimalCard from '../../../components/icons/profil/AnimalCard.vue';
import {onMounted, ref} from 'vue';
import axios from 'axios'
import router from '../../../router';
import { RouterLink } from 'vue-router';

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


const animals= ref([]);



onMounted(()=>{
    axios.get('animals/allAnimals')
        .then((response) => {
            console.log(response);
            animals.value = response.data
        })
        .catch(err => console.log(err) )
})
    


</script>

<style scoped lang="scss">
.new{
    margin-bottom: 1rem;
}
.material-icons{
    text-decoration: none;
    color: var(--primary);
    border: 1px solid;
    padding: 0.5rem;
    border-radius: 5px;
}
.material-icons:hover{
    color: #582391;
    
}
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
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    position:relative;
    background-image: url('../../../images/pattes.jpg');
    background-position: center;
    background-repeat:repeat ;
    background-size: cover;
}
.animal{
  text-decoration: none;
}

</style>