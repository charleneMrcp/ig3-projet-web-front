<template>
    <div class="formulaireInscription">      
      
      <h3> Inscription </h3>

      <form @submit.prevent="signUp" >
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
            <label for="Nom"> Nom </label>
            <input type="text" placeholder="Nom" v-model="state.nom">
            <span v-if="v$.nom.$error">
            {{ v$.nom.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <label for="Prenom"> Prenom </label>
            <input type="text" placeholder="Prenom" v-model="state.prenom">
            <span v-if="v$.prenom.$error">
            {{ v$.prenom.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <label for="Age"> Age </label>
            <input type="text" placeholder="Age" v-model="state.age">
            <span v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <label for="Telephone"> Telephone </label>
            <input type="tel" placeholder="Telephone" v-model="state.tel">
            <span v-if="v$.tel.$error">
            {{ v$.tel.$errors[0].$message }}
            </span>

        </div>

        
        <div class="check">
            <label for="Logement"> Type de logement </label>

            <input type="radio" id="three" value="Appartement" v-model="state.logement" />
            <label for="three">Appartement</label>

            <input type="radio" id="four" value="Maison" v-model="state.logement" />
            <label for="four">Maison</label>

            
        </div>

        <div class="form">
            <label for="Adresse"> Adresse </label>
            <input type="text" placeholder="Adresse" v-model="state.addr">
            <span v-if="v$.addr.$error">
            {{ v$.addr.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <label for="code_post"> Code postal </label>
            <input type="text" placeholder="Code Postal" v-model="state.code_post">
            <span v-if="v$.code_post.$error">
            {{ v$.code_post.$errors[0].$message }}
            </span>
        </div>

        <div class="check">

            <input type="radio" id="one" value="Homme" v-model="state.sexe" />
            <label for="one">Homme</label>

            <input type="radio" id="two" value="Femme" v-model="state.sexe" />
            <label for="two">Femme</label>

            <span v-if="v$.sexe.$error">
            {{ v$.sexe.$errors[0].$message }}
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
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../router';

export default{
    
    setup(){
        const router = useRouter();
        const state = reactive({
            nom: "",
            prenom: "",
            age: null,
            tel:  "",
            mail:  "",
            mdp:  "",
            sexe:  "",
            addr:  "",
            code_post: null,
            logement: "",
        
        })

        const rules = computed(()=> {
            return {
                nom: { required, alpha  },
                prenom: { required, alpha  },
                age: { required, numeric },
                tel:  { required, },
                mail: { required, email},
                mdp: { required },
                sexe:{ required },
                addr:  { required },
                code_post: { required, numeric },
                logement: { required }
            }
        })

        const v$ = useValidate(rules, state)

        return {
            state,
            v$,
        }
    },
    methods:{
        async signUp(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.post("http://localhost:3000/user/inscription", this.state)
                .then(response => { 
            
                //Problème pour
                alert('Form successfully submitted') ;
                //Réinitialiser le formulaire
                const form = document.querySelector('form');
                form.reset();
                router.push('/signIn')

                })
                .catch(error => { console.error(error); });
                
            
            }
            else{
                alert('Form failed submitted ')
            }
            
        },

       
    },
}
</script>

<style scoped>
 input{
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 4px;
    border: none;
    border-bottom: 1px solid green;
 }
 div{
    display: block;
 }
</style>