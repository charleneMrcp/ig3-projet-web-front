<template>
    <div class="composant">
        
        <div class="image">
            <img src="/src/images/image_connexion.png" alt="Ceci est l'image de connexion"/>  
        </div>
               
        <form @submit.prevent="signIn" class="form">
            <h1> Connexion </h1>    
            <div class="boite">
                <label for="Email"> Email </label>
                <input type="mail" placeholder="Email" v-model="state.mail">
                <span v-if="v$.mail.$error">
                {{ v$.mail.$errors[0].$message }}
                </span>
            </div>

            <div class="boite">
                <label for="Password"> Password </label>
                <input type="password" placeholder="Mot de passe" v-model="state.mdp">
                <span v-if="v$.mdp.$error">
                {{ v$.mdp.$errors[0].$message }}
                </span>
            </div>

            <div class="boite">
                <button type="submit"> Valider </button>
            </div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../router';


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
                
                })
                .catch(error => { console.error(error); });
                
            
            }
            else{
                alert('Authentification failed')
            }
            
            
        },

       
    },
    
}
</script>

<style scoped>
.composant{
    
    width: 80%;
    margin: auto;
    display: flex;
    height: 60vh;
    border: 1px solid black;
    
}


img{
    max-width:100%;
    max-height: 100%;
}


.form{
    
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


}
h1{
    text-align: center;
}

</style>