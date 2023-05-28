<template>
    <div class="contain">
        <h1> Renseigner les informations</h1>
    </div>

    <div class="modif">
        <form @submit.prevent="rdv">
            <div class="entree">
                <div class="gauche">
                    <div class="boite">
                        <label for="date_debut"> Date de début </label>
                            <div class="input-wrapper">
                            <input type="date" v-model="state.date_debut">
                            <span class="error" v-if="v$.date_debut.$error">
                            {{ v$.date_debut.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="date_fin"> Date de fin </label>
                        <div class="input-wrapper">
                            <input type="date" v-model="state.date_fin">
                            <span class="error" v-if="v$.date_fin.$error">
                            {{ v$.date_fin.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="h_debut"> Heure de début </label>
                        <div class="input-wrapper">
                            <input type="time" v-model="state.h_debut">
                            <span class="error" v-if="v$.h_debut.$error">
                            {{ v$.h_debut.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="h_fin"> Heure de fin </label>
                        <div class="input-wrapper">
                            <input type="time" v-model="state.h_fin">
                            <span class="error" v-if="v$.h_fin.$error">
                            {{ v$.h_fin.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="droite">
                    <div class="boite">
                        <label for="acti-select">Choisis une activite:</label>
                        <div class="input-wrapper">
                            <select name="activites" id="acti-select" v-model="state.libelle_acti">
                            <option value="">--Merci de choisir une option--</option>
                            <option v-for="(activite, index) in activites" :key="index" :value="activite.libelle_acti">{{ activite.libelle_acti }}</option>
                            </select>
                            <span class="error" v-if="v$.libelle_acti.$error">
                            {{ v$.libelle_acti.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="pet-select">Pour quel animal:</label>
                        <div class="input-wrapper">
                            <select name="animal" id="pet-select" v-model="state.pet_id">
                            <option value="">--Merci de choisir une option--</option>
                            <option v-for="(animal, index) in animaux" :key="index" :value="animal.pet_id">{{ animal.nom_pet }}</option>
                            </select>
                            <span class="error" v-if="v$.pet_id.$error">
                            {{ v$.pet_id.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="quick_desc"> Donnez une description de votre demande </label>
                        <div class="input-wrapper">
                            <textarea v-model="state.quick_desc"></textarea>
                            <span class="error" v-if="v$.quick_desc.$error">
                            {{ v$.quick_desc.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit"> Valider </button>
            <div class="success-message" v-if="success">
                Demande de réservation réussie ! En attente de la validation du petsitter.
            </div>
            <div class="error" v-if="error">
                Echec lors de la prise de rendez-vous !
            </div>
        </form>
    </div>


</template>

<script>

import { VueElement } from 'vue'
import { reactive, onMounted, ref , computed} from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from '../../router'
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

const error= ref(false)
const success = ref(false)
export default {
    setup(){ 
        const route= useRoute()        
        const state = reactive({
            date_debut: null,
            date_fin: null,
            h_debut: null,
            h_fin:null,
            libelle_acti: "",
            pet_id: null,
            sitter_id: route.params.id,
            quick_desc:""

        })

        const rules = computed(()=> {
                return {
                    date_debut: { required },
                    date_fin: { required },
                    h_debut:{ required},
                    h_fin: {required},
                    libelle_acti: {required},
                    pet_id: {required},
                    sitter_id: {required},
                    quick_desc: {required}
                }
        })
        const v$ = useValidate(rules, state)

        const activites = ref([]);

        const getActivite= async() =>{
            await axios.get('/activite/tous')
            .then((response) => {
            activites.value = response.data
                       
        }) 
         }
        const animaux = ref([]);
        const getAnimaux= async()=>{
            await axios.get('/animals/allAnimals')
            .then((response) => {
            animaux.value = response.data
                       
        }) 
        }
        
       
        onMounted(()=>{
            getActivite()
            getAnimaux()
        })
        

        return {
            state, v$ , activites, animaux, error, success
        }
    },
    methods:{
    async rdv(){
        this.v$.$validate()
        if (!this.v$.$error){
            await axios.post("/reservations/newReservation", this.state)
            .then((response) => {
                success.value = true
                error.value =false                       
            })
            .catch(err => console.log(err))
        }
        else{
            success.value = false
            error.value = true      
        }
    }
    }
}


</script>

<style lang="scss" scoped>

.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: row;

    
}
@media (max-width:530px) {
    .boite{
        flex-direction: column;
        
    }
    
}
.gauche {
    align-items: center;
}

.droite {

    align-items: center;
}

.contain {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.entree{
    border-radius: 3px;
    background-color: rgb(235, 234, 234) ;
    
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

h1{
    text-align: center;
    color: #582391; 
    font-family: 'Fira sans';    
}
form{
    text-align: center;
}
button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    
}
button:hover{
    background-color: mediumpurple ;
}

input{
    font-size: 1rem;
    font-family: 'Fira sans';
    padding: 0.1rem 0.2rem;
    color: grey
}
label{
    font-size: 1rem;
    font-family: 'Fira sans';
    padding: 0.1rem 0.2rem;
    width:8rem;
    margin-right: 1rem;
}

select{
    background-color: var(--light);
    color:grey;
    font-family: 'Fira sans';
}
.error{
  color: #e74c3c;
  font-size: 0.8rem;
  font-family: "Fira sans";
}

.success-message{
  color: green;
  font-size: 0.8rem;
  font-family: "Fira sans";
}
.input-wrapper {
  display: flex;
  flex-direction: column;
}
.input-wrapper .error {
  
  color: #e74c3c;
  font-size: 0.8rem;
  font-family: "Fira sans";
  text-align: left;
}



</style>