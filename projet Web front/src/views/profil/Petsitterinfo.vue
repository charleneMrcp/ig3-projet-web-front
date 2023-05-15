<template>

    <div class="contain">
      <div class="name">
          <h1 class="nom"> {{  user.nom }}  </h1>
          <h1 class="prenom">{{  user.prenom }}</h1>
      </div>

      <img class="image"  :src="user.sexe === 'Femme' ? '/src/images/fille.jpg' : '/src/images/garcon.png'" alt="Ceci est la photo du petsitter">
    </div>

    <div class="haut">
      <div class="userer">
        <div class="boitee">
          <h3>Telephone:</h3>
          <p>{{ user.tel }}</p>
        </div>

        <div class="boitee">
          <h3>Mail:</h3>
          <p>{{ user.mail }}</p>
        </div>

        <div class="boitee">
          <h3>Code Postale:</h3>
          <p>{{ user.code_post }}</p>
        </div>

      </div>
      <div class="sitter">
        <div class="boitee">
          <h3>Logement:</h3>
          <p>{{ user.logement }}</p>
        </div>

        <div class="boitee">
          <h3>Surface:</h3>
          <p>{{ sitter.surface }} m²</p>
        </div>

        <div class="boitee">
          <h3>Extérieur:</h3>
          <p>{{ sitter.exterieur }}</p>
        </div>

        <div class="boitee">
          <h3>Vehicule:</h3>
          <p>{{ sitter.vehicule }}</p>
        </div>

      </div>
    </div>

    <div class="bas">

      <div class="boitee">
        <h3>Expérience:</h3>
        <p>{{ sitter.exp_desc }}</p>
      </div>


      <div class="boitee">
        <h3>Motivation:</h3>
        <p>{{ sitter.motiv_desc }} </p>
      </div>

      <div class="boitee">
        <h3>Logement:</h3>
        <p>{{ sitter.loge_desc }}</p>
      </div>
    </div>
      

      

    

    <div class="boutton">
      <router-link class="bt" :to="{name: 'petsitter-rdv'}" tag="button">Prendre un rendez-vous</router-link>
    </div>
    


  
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '../../router';
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
            console.log(response.data)

        })
      })
    })

   
    

    return {
      id: routeParams.id,
      sitter,
      user, 
      
    }
  }
}
</script>

<style scoped lang="scss">
.haut{
  border-radius: 3px;
  background-color: rgb(242, 207, 229) ;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
}
.boutton{
  display: flex;
  align-items: center;
  justify-content: center;
  margin:1rem;
  
  .bt{
    background-color: var(--primary);
    color:var(--light);
    text-decoration: none;
    padding:0.5rem;
    text-align: center;
  }
  .bt:hover{
    background-color: mediumpurple;
  }
}

.contain {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.image{
    width:7rem;
    height: auto;
    display:inline;
    margin: auto;
    padding-top: 1rem;
}
.name{
    max-width: 90%;
    margin: auto;
    justify-content: center;
    display: flex;
    .nom{
        padding-right: 5px;
        font-size: 1.5rem;
        color: #582391;
        font-family: 'Fira sans'; 
    }
    .prenom{
        font-size:1.5rem;
        color: #582391;
        font-family: 'Fira sans'; 
    }
}

.boitee{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: row;
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

.bas .boitee{
  margin:1rem;
  background-color: rgb(235, 234, 234) ;
  margin-top: 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  
  
  h3{
    margin-top: 1rem;
    text-align: center;
    font-family: 'Fira sans';
  }
  p{
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 40rem;
    font-family: 'Fira sans';
  }
}


</style>


