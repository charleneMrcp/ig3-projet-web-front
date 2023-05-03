<template>
  <div>

    <p> Description : {{ sitter.exp_desc }}</p>
    <p> Nom: {{  user.nom }}</p>
    <p> Prenom:  {{  user.prenom }}</p>
    <p> Age: {{  user.age }}</p>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');
export default {
 
  setup() {
    const route = useRoute()
    const routeParams = reactive({
      id: route.params.id
    })
    
    const sitter = ref({});
    const user = ref({});

    onMounted(() => {
      axios.get(`/petsitters/getpetsitter/${routeParams.id}`)
      .then((response) => {
        sitter.value = response.data
        axios.get(`/user/index/${response.data.user_id}`)
        .then((response)=>{
            user.value = response.data

        })
      })
    })

   
    

    return {
      id: routeParams.id,
      sitter,
      user
      
    }
  }
}
</script>


