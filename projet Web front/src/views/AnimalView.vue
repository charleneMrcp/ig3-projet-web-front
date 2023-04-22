<template>
    <div class="animal-vue">
        <h1> this is the view for animals</h1>
        
        <div class="animaux-wrap">
           
            <AnimalCard v-for="(animal,index) in animals" :key="index">
            <template #nom>{{ animal?.nom_pet }}</template>
            <template #type>{{ animal?.type }}</template>
            </AnimalCard>

        </div>
        
    </div>
    
</template>

<script setup>

import AnimalCard from '../components/icons/AnimalCard.vue';
import {onMounted, ref} from 'vue';

const animals= ref([]);

onMounted(()=>{
    fetch('http://localhost:3000/animals/tous')
        .then((response) => response.json() )
        .then((data) => {
            console.log(data);
            animals.value = data
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