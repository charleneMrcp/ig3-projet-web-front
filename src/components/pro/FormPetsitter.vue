<template>
    <h1>Créer ton compte Petsitter !</h1>
    <h2>Ajoute tes informations:</h2>

    <form @submit.prevent="inscription">
        <div class="contain">
            <div class="boite">
                <label for="vehicule">Véhicule :</label>
                <div class="input-wrapper">
                    <input id="vehicule" type="checkbox" v-model="element.vehicule" :class="{ error: v$.vehicule.$error }">
                    <span v-if="v$.vehicule.$error" class="error-message">{{ v$.vehicule.$errors[0].$message }}</span>
                </div>
            </div>
            
            <div class="boite">
                <label for="surface">Surface (en m²) :</label>
                <div class="input-wrapper">
                    <input id="surface" type="number" v-model.number="element.surface" :class="{ error: v$.surface.$error }">
                    <span v-if="v$.surface.$error" class="error-message">{{ v$.surface.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="boite">
                <label for="exp_desc">Description de l'expérience :</label>
                <div class="input-wrapper">
                    <textarea id="exp_desc" v-model="element.exp_desc" :class="{ error: v$.exp_desc.$error }"></textarea>
                    <span v-if="v$.exp_desc.$error" class="error-message">{{ v$.exp_desc.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="boite">
                <label for="loge_desc">Description de l'hébergement :</label>
                <div class="input-wrapper">
                    <textarea id="loge_desc" v-model="element.loge_desc" :class="{ error: v$.loge_desc.$error }"></textarea>
                    <span v-if="v$.loge_desc.$error" class="error-message">{{ v$.loge_desc.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="boite">
                <label for="motiv_desc">Description de votre motivation :</label>
                <div class="input-wrapper">
                    <textarea id="motiv_desc" v-model="element.motiv_desc" :class="{ error: v$.motiv_desc.$error }"></textarea>
                    <span v-if="v$.motiv_desc.$error" class="error-message">{{ v$.motiv_desc.$errors[0].$message }}</span>
                </div>
            </div>
            <div class="boite">
                <label for="exterieur">Espace extérieur :</label>
                <div class="input-wrapper">
                    <input id="exterieur" type="checkbox" v-model="element.exterieur" :class="{ error: v$.exterieur.$error }">
                    <span v-if="v$.exterieur.$error" class="error-message">{{ v$.exterieur.$errors[0].$message }}</span>
                </div>
            </div>
        </div>

        
        <button type="submit"> Valider </button>

    </form>
</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { reactive, computed,ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../router';



export default{
    
    setup(){
        const element=reactive({
            vehicule: false,
            surface:null ,
            exp_desc:"" ,
            loge_desc: "",
            motiv_desc:"" ,
            exterieur: false,
        })
        const rules = computed(()=> {
            return {
                vehicule: {required},
                surface:{required} ,
                exp_desc:{required} ,
                loge_desc: {required},
                motiv_desc:{required} ,
                exterieur: {required},              
            }
        })

        const v$ = useValidate(rules, element)

        return{
            element, v$,
        }
    },
    methods:{
        async inscription(){
            this.v$.$validate()
            if (!this.v$.$error){
                await axios.post('/petsitters/newPetsitter', this.element)
                .then((response)=>{
                    alert('You are now a pro ! Find your reservations on the next page')
                    location.reload()
                })
            }
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
.input-wrapper {
  display: flex;
  flex-direction: column;
}
.input-wrapper .error-message {
  
  color: #e74c3c;
  font-size: 0.8rem;
  font-family: "Fira sans";
  text-align: left;
}
.error-message{
  color: #e74c3c;
  font-size: 0.8rem;
  font-family: "Fira sans";
}
.success-message{
  color: green;
  font-size: 0.8rem;
  font-family: "Fira sans";
}

</style>