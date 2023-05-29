<template>
    <h1> Détails de la réservation </h1>
    <div class="infos">
        <div class="global">

          <div class="haut">
            <div class="reserv-image">
              <img class="image" :src="reservation.validation === true ? '/src/images/valider.png' : '/src/images/nonvalider.png'" alt="Image de l'etat de la reservation"> 
            </div>

            

          </div>
          


          <div class="informations">
            <div class="gauche">
              <div class="boite">
                <h3>Date de debut:</h3>
                <p>{{reservation.date_debut}}</p>
              </div>
              <div class="boite">
                <h3>Date de fin:</h3>
                <p>{{reservation.date_fin}} </p>
              </div>
            </div>

            <div class="droite">
              <div class="boite">
                <h3>Heure de debut:</h3>
                <p>  {{reservation.h_debut}} </p>
              </div>
              <div class="boite">
                <h3>Heure de fin:</h3>
                <p>{{reservation.h_fin}} </p>
              </div>

            </div>
          </div>
          <div class="desc">
            <h3>Description:</h3>
            <p class="descr">{{reservation.quick_desc}} </p>
          </div>
        </div>
        <div class="user">
          <h2>Utilisateur</h2>
          <div class="boites">

            <div class="boite">
                  <h3>Nom:</h3>
                  <p>{{reservation.nomU}} </p>
            </div>
            <div class="boite">
                  <h3>Prenom:</h3>
                  <p>{{reservation.prenomU}} </p>
            </div>
            <div class="boite">
                  <h3>Tel:</h3>
                  <p>{{reservation.telU}} </p>
            </div>
          </div> 

        </div>
        <div class="animal">
          <h2> Animal </h2>
          <div class="informations">
            <div class="gauche">

              <div class="boite">
                    <h3>Nom:</h3>
                    <p>{{reservation.nom_pet}} </p>
              </div>
              <div class="boite">
                    <h3>Type:</h3>
                    <p>{{reservation.type}} </p>
              </div>
              <div class="boite">
                    <h3>Sexe:</h3>
                    <p>{{reservation.sexe}} </p>
              </div>
              <div class="boite">
                    <h3>Taille:</h3>
                    <p >{{reservation.taille}} cm </p>
              </div>
              <div class="boite">
                    <h3>Age:</h3>
                    <p>{{reservation.age}} ans </p>
              </div>
              
            </div>
            
            <div class="droite">
              <div class="boite">
                    <h3>Poids:</h3>
                    <p>{{reservation.poids}} kg </p>
              </div>
              <div class="boite">
                <h3>Réactivité humains:</h3>
                <p>{{reservation.vs_humain}}</p>
              </div>
              <div class="boite">
                    <h3>Réactivité enfants:</h3>
                    <p>{{reservation.vs_enfants}}</p>
              </div>
              <div class="boite">
                <h3>Réactivité chiens:</h3>
                <p>{{reservation.vs_dog}}</p>
              </div>
              <div class="boite">
                    <h3>Réactivité chats:</h3>
                    <p>{{reservation.vs_cat}}</p>
              </div>
                
            </div>
          </div>
          <div class="boite">
                  <h3>Race:</h3>
                  <p>{{reservation.race}} </p>
            </div>
          <div class="boite">
                <h3 class="coco">Description:</h3>
                <p class="descr">{{reservation.desc_gene}} </p>
          </div>
          

        </div>

        
        
    </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from '../../router';
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');


export default {
 
  setup() {
    const route = useRoute()
    const routeParams = reactive({
      id: route.params.id
    })
    
    const reservation = ref({});
    

    onMounted(() => {
      axios.get(`/reservations/getReservation/${routeParams.id}`)
      .then((response) => {
        reservation.value = response.data
        console.log(response.data)
        })
    })

   
    

    return {
      id: routeParams.id,
      reservation,
      
      
      
    }
  }
}
</script>

<style scoped lang="scss">
.coco{
  text-align:center
}
.global{
  width: 60%;
  margin: auto;
  background-color: rgb(235, 234, 234);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 796px){
    width:80%;
  }
}
.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: column;
    h3{
      padding-right: 5px;
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
    @media (min-width: 482px){

      p.descr{
      max-width: 25rem;
      overflow: auto;
      }
    }
    
    
}

h1{
    text-align: center;
    color: #582391;
    font-family: 'Fira sans';  
    margin:1rem;
    padding-bottom: 2rem;
}

button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    margin:auto;
    width:6rem;
}

button:hover{
    background-color: mediumpurple ;
}
.informations{
  overflow:auto;
  margin:1rem;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  
}
.haut{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  flex-wrap: wrap;
  align-items: center;
}
.image{
    width:7rem;
    height: auto;
    display:inline;
    margin-bottom: 1rem;
    padding-top: 1rem;
}
.desc{
  width: 80%;
  margin: auto;
  text-align: center;
  display: flex  ;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 2rem;
  h3{
    color: #582391;
    font-family: 'Fira sans'; 
    padding-right: 5px;
  }
  p{
      max-width: 8rem;
      color: grey;
      font-family: 'Fira sans'; 
      font-size: 1rem;
      
      width: 100%;
    }
}
.infos{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.reserv-image{
  margin-top:1rem;
  border: 3px dotted grey;
  border-radius: 3px;
  width: 13rem;
  display: flex;
  justify-content: center;
}
.animal{
  overflow:auto;
  @media (max-width: 796px){
    width:80%;
  }
  margin-top: 10px;
  margin-bottom: 10px;
  h2{
    color: #582391;
    font-family: 'Fira sans';
  }
  background-color: rgb(235, 234, 234);
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  
  
}
p.descr{
  
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Fira sans';
  word-wrap: break-word;
  font-size: 1rem;
  
  
}
.user{
  @media (max-width: 796px){
    width:80%;
  }
  background-color: lightblue;
  margin-top: 10px;
  margin-bottom: 10px;
  h2{
    color: #582391;
    font-family: 'Fira sans';
  }
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  
  display: flex;
  flex-direction:column;

  align-items: center;
  .boites{
    width:100%;
    flex-direction: row;
    flex-wrap:wrap;
    display:flex;
    justify-content:space-between;
  }
}
</style>