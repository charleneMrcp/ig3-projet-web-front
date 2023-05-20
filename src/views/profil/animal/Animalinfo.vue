<template>
    <div>

      <div class="contain">
            <h1>{{ animal.nom_pet}}</h1>
            <img class="image"  :src="animal.type === 'Chat' ? '/src/images/chat.png' : '/src/images/chien.png'" alt="Ceci est la photo de l'animal">
            
            <div class="boutons">
              <button @click="supprimer">Supprimer</button>
              <button @click="modifier"> Modifier</button>
            </div>
            

      </div>
      <div class="entree">
        <div class="gauche">

          <div class="boite">
            <h3>Id:</h3>
            <p>{{ id }}</p>
          </div>

          
          <div class="boite">
            <h3>Nom:</h3>
            <p>{{ animal.nom_pet }} </p>
          </div>
  
          <div class="boite">
            <h3>Type:</h3>
            <p>{{ animal.type }}</p>
          </div>

          <div class="boite">
            <h3>Sexe:</h3>
            <p>{{ animal.sexe }}</p>
          </div>

          <div class="boite">
            <h3>Age:</h3>
            <p>{{ animal.age }}</p>
          </div>

          <div class="boite">
            <h3>Taille:</h3>
            <p>{{ animal.taille }} cm</p>
          </div>  

        </div>
      
        <div class="droite">

          <div class="boite">
            <h3>Poids:</h3>
            <p>{{ animal.poids }} kg</p>
          </div>
          
          <div class="boite">
            <h3>Race:</h3>
            <p>{{ animal.race }}</p>
          </div>
          
          <div class="boite">
            <h3>Reactivite chien:</h3>
            <p>{{ animal.vs_dog }}</p>
          </div>
          

          <div class="boite">
            <h3>Reactivite chat:</h3>
            <p>{{ animal.vs_cat }}</p>
          </div>
         

          <div class="boite">
            <h3>Reactivite humain:</h3>
            <p>{{ animal.vs_humain }}</p>
          </div>
          

          <div class="boite">
            <h3>Reactivite enfant:</h3>
            <p>{{ animal.vs_enfants }}</p>
          </div>
          
        </div>

      </div>  
      <div class="desc">
        <div class="boite">
            <h3>Description générale:</h3>
            <p>{{ animal.desc_gene }}</p>
        </div>
      </div>

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


<style scoped lang="scss">
.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: row;
    
}
.contain {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1{
    text-align: center;
    color: #582391;
    font-family: 'Fira sans';  
  
}
.image{
    width:7rem;
    height: auto;
    display:inline;
    margin: auto;
    padding-top: 1rem;
}
button{
    width: 6rem;
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    margin:1rem;
}
button:hover{
    background-color: mediumpurple ;
}
.entree{
    border-radius: 3px;
    background-color: rgb(235, 234, 234);
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom:0px;
    text-align: center;
}
.gauche {
    align-items: center;
}

.droite {

    align-items: center;
}
.desc .boite{
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
    text-align: center;
    width: 40rem;
    font-family: 'Fira sans';
  }
}


h3{
  color:#582391;
  font-size: 1rem;
  
  font-family: 'Fira sans';
}
.boite p{
  margin-left: 1rem;
  width:8rem;
  color: var(--grey); 
  font-family: 'Fira sans';
}


</style>