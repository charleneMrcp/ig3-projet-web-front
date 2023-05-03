<template>
    <div>
        <h1> Animal details </h1>

        <button @click="supprimer">Supprimer</button>
        
        <button @click="modifier"> Modifier</button>

        <p> Id : {{ id }}</p>
        <p> Nom : {{ animal.nom_pet }} </p>
        <p> Type: {{ animal.type }}</p>
        <p> Sexe: {{ animal.sexe }}</p>
        <p> Age: {{ animal.age }}</p>
        <p> Taille: {{ animal.taille }}</p>
        <p> Poids: {{ animal.poids }}</p>
        <p> Race: {{ animal.race }}</p>
        <p> vs_dog: {{ animal.vs_dog }}</p>
        <p> vs_cat: {{ animal.vs_cat }}</p>
        <p> vs_humain: {{ animal.vs_humain }}</p>
        <p> vs_enfants: {{ animal.vs_enfants }}</p>
        <p> Description generale: {{ animal.desc_gene }}</p>

    </div>


</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from '../../../router';
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


export default {
 
  setup() {
    const route = useRoute()
    const routeParams = reactive({
      id: route.params.id
    })
    
    const animal = ref({});
    

    onMounted(() => {
      axios.get(`/animals/animal/${routeParams.id}`)
      .then((response) => {
        animal.value = response.data
        })
    })

   const supprimer = ()=>{
      axios.delete(`animals/deleteAnimal/${routeParams.id}`)
      .then(response => {
        console.log('Item deleted:', response.data);
        router.push('/signIn/animal')
      })
      .catch(error => {
        console.error('Error deleting item:', error);
        console.log(error.response.data);
      });

   }

   const modifier = ()=>{
    router.push(`/signIn/animal/${routeParams.id}/update`)
   }
    

    return {
      id: routeParams.id,
      animal,
      supprimer,
      modifier
      
      
    }
  }
}
</script>