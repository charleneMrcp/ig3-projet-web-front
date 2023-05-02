<template>
    <div>
        <form @submit.prevent="signIn">
            <div class="form">
                <label for="Email"> Email </label>
                <input type="mail" placeholder="Email" v-model="state.mail">
                <span v-if="v$.mail.$error">
                {{ v$.mail.$errors[0].$message }}
                </span>
            </div>

            <div class="form">
                <label for="Password"> Password </label>
                <input type="password" placeholder="Mot de passe" v-model="state.mdp">
                <span v-if="v$.mdp.$error">
                {{ v$.mdp.$errors[0].$message }}
                </span>
            </div>

            <div class="form">
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
                    router.push('/signIn/profil')
                
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

<style>
</style>