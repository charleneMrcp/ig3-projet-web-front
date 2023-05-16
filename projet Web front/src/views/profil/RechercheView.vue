<template>

<div class="petsitter-vue">
  <h1> Choisis ton Petsitter !</h1>

  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="Rechercher un Petsitter...">
    <select v-model="selectedCodePost">
      <option value="">Tous les codes postaux</option>
      <option v-for="code in uniqueCodePosts" :value="code">{{ code }}</option>
    </select>
  </div>


  <div class="cards">
    <div v-for="(petsitter, index) in filteredPetsitters" :key="index">
    <router-link class="element" :to="{ name: 'petsitter-details', params: {id: petsitter.sitter_id } }">
        <PetsitterCard :sexe="petsitter?.sexe">
          <template #nom>{{ petsitter?.nom }} </template>
          <template #prenom>{{ petsitter?.prenom }}</template>
          <template #code_post>{{ petsitter?.code_post }}</template>
        </PetsitterCard>
    </router-link>
</div> 

  </div>
        
</div>
</template>
  
<script setup>

import PetsitterCard from '../../components/icons/profil/PetsitterCard.vue';
import {onMounted, ref, computed} from 'vue';
import axios from 'axios'
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


const petsitters= ref([]);
const searchQuery = ref('');
const selectedCodePost = ref('');

onMounted(async()=>{
    await axios.get('/petsitters/allpetsitters')
        .then((response) => {
            console.log(response);
            petsitters.value = response.data
        })
})

const filteredPetsitters = computed(() => {
  return petsitters.value.filter((petsitter) => {
    const fullName = petsitter.nom.toLowerCase() + ' ' + petsitter.prenom.toLowerCase();
    const matchesSearchQuery = fullName.includes(searchQuery.value.toLowerCase());
    const matchesCodePost = selectedCodePost.value ? petsitter.code_post === selectedCodePost.value : true;
    return matchesSearchQuery && matchesCodePost;
  });
});

const uniqueCodePosts = computed(() => {
  const codePosts = new Set();
  petsitters.value.forEach((petsitter) => {
    codePosts.add(petsitter.code_post);
  });
  return Array.from(codePosts);
});



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
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
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


.search-bar{
  display: flex;
  justify-content: center;
  margin: 2rem;
  padding: 1rem;
  input{
    width: 50%;
    padding: 1rem;
      }
}



</style>
