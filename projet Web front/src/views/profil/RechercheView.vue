<template>

<div class="petsitter-vue">
  <h1> this is the view for petsitters</h1>
  
  <div v-for="(petsitter, index) in petsitters" :key="index">
  <router-link :to="{ name: 'petsitter-details', params: {id: petsitter.sitter_id } }">
    <div class="petsitter-card">
      <PetsitterCard>
        <template #nom>{{ petsitter?.nom }}</template>
        <template #prenom>{{ petsitter?.prenom }}</template>
        <template #age>{{ petsitter?.age }}</template>
      </PetsitterCard>
    </div>
  </router-link>
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

<style scoped>


</style>