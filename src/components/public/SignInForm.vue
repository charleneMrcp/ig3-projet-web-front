<template>
    <div class="composant">
                       
        <form @submit.prevent="signIn" class="form">
            
            <h1> Connexion </h1>    
            
            <div class="boite">
                <label for="Email"> Email : </label>
                <div class="input-wrapper">
                    <input type="mail" placeholder="Email" v-model="state.mail">
                    <span v-if="v$.mail.$error" class="error-message">{{ v$.mail.$errors[0].$message }}</span>
                </div>
            </div>

            <div class="boite">
                <label for="Password"> Mot de passe : </label>
                <div class="input-wrapper">
                    <input type="password" placeholder="Mot de passe" v-model="state.mdp">
                    <span v-if="v$.mdp.$error" class="error-message">{{ v$.mdp.$errors[0].$message }}</span>
                </div>
            </div>
           
            <div class="boite boutton">
                <button type="submit"> Valider </button>
            </div>
            <div class="error-message" v-if="success">
                Echec de la connection !
            </div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../router';

const success = ref(false); 
export default{
    
    setup(){
       
        const state = reactive({
            mail:  "",
            mdp:  "",                  
        })

        const rules = computed(()=> {
            return {
                mail: { required, email},
                mdp: { required },                
            }
        })

        const v$ = useValidate(rules, state)

        return {
            state,
            v$,
            success,
            
        }
    },
    methods:{
        async signIn(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.post("user/connexion", this.state)
                .then(response => { 
                    localStorage.setItem('token', response.data.token);
                    // Réinitialiser le formulaire
                    const form = document.querySelector('form');
                    form.reset();
                    router.push('/signIn/recherche')
                    if(response.status != 201){
                        success.value = true
                    }
                })
                .catch(error => { console.error(error); });
                
            
            }
            else{
                success.value = true;
            }
            
            
        },

       
    },
    
}
</script>

<style scoped>
.composant {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

h1 {
  padding: 0.5rem;
  color: #582391;
  font-family: "Fira sans";
}

.boite {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.5rem;
  justify-content: center;
}

.boite label {
  padding: 0.5rem;
  width: 80px;
  text-align: left;
  margin: 3px;
  font-family: "Fira sans";
}

.boite input[type="mail"],
.boite input[type="password"] {
  flex: 1; /* Permet aux champs de saisie de remplir l'espace disponible */
  padding: 0.5rem;
  margin: 3px;
}

.boite.boutton {
  justify-content: center;
  align-items: center;
}

button {
  background-color: rgb(83, 83, 206);
  color: var(--light);
  padding-left: 1rem;
  padding-right: 1rem;
  padding: 0.5rem;
}

button:hover {
  background-color: mediumpurple;
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

</style>