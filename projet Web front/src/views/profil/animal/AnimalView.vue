<template>

    <div class="animal-vue">
      <h1> Your Animals</h1>
      <div class="new">
         <router-link :to="{name: 'animal-add'}">Add animal</router-link>
      </div>

      <div v-for="(animal, index) in animals" :key="index">
        <router-link :to="{ name: 'animal-details', params: {id: animal.pet_id } }">
            <div class="animaux-wrap">
            <AnimalCard>
                <template #nom>{{ animal?.nom_pet }}</template>
                <template #type>{{ animal?.type }}</template>
            </AnimalCard>
            </div>
        </router-link>
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
})
    


</script>

<style>

.animal-vue{
    text-align: center;
}

div.animaux-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
}


</style>