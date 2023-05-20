<template>
    <h1>Créer ton compte Petsitter !</h1>
    <h2>Ajoute tes informations:</h2>

    <form @submit.prevent="inscription">
        <div class="contain">
            <div class="boite">
                <label for="vehicule">Véhicule :</label>
                <input id="vehicule" type="checkbox" v-model="element.vehicule">
            </div>
            <div class="boite">
                <label for="surface">Surface (en m²) :</label>
                <input id="surface" type="number" v-model.number="element.surface">
            </div>
            <div class="boite">
                <label for="exp_desc">Description de l'expérience :</label>
                <textarea id="exp_desc" v-model="element.exp_desc"></textarea>
            </div>
            <div class="boite">
                <label for="loge_desc">Description de l'hébergement :</label>
                <textarea id="loge_desc" v-model="element.loge_desc"></textarea>
            </div>
            <div class="boite">
                <label for="motiv_desc">Description de votre motivation :</label>
                <textarea id="motiv_desc" v-model="element.motiv_desc"></textarea>
            </div>
            <div class="boite">
                <label for="exterieur">Espace extérieur :</label>
                <input id="exterieur" type="checkbox" v-model="element.exterieur">
            </div>

        </div>
        
        <button type="submit"> Valider </button>
    </form>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted, ref , computed} from 'vue'

export default{
    
    setup(){
        const element=reactive({
            vehicule: null,
            surface:null ,
            exp_desc:"" ,
            loge_desc: "",
            motiv_desc:"" ,
            exterieur: null,
        })

        return{
            element
        }
    },
    methods:{
        async inscription(){
            await axios.post('/petsitters/newPetsitter', this.element)
            .then((response)=>{
                alert('You are now a pro ! Find your reservations on the next page')
                location.reload()
            })
        }
    }
}
</script>

<style scoped lang="scss">

button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    margin:auto;
    width:5rem;
}

button:hover{
    background-color: mediumpurple ;
}

input{
    font-size: 1rem;
    font-family: 'Fira sans';
    padding: 0.1rem 0.2rem;
    color: grey;
    width: 12rem;
}
label{
    font-size: 1rem;
    font-family: 'Fira sans';
    padding: 0.1rem 0.2rem;
    width:12rem;
    margin-right: 1rem;
}
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
  background-color: rgb(235, 234, 234);
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;

}

h1{
    text-align: center;
    color: #582391;
    font-family: 'Fira sans';  
    margin:1rem;
}
h2{
    color: #582391;
    font-family: 'Fira sans';  
    margin-top:2rem
}
form{
    justify-content: center;
    display: flex;
    flex-direction: column;
}

</style>