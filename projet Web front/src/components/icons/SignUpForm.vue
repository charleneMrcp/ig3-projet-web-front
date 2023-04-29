<template>
    <div class="formulaireInscription">      
      
      <h3> Inscription </h3>

      <form @submit.prevent="signUp">
        <div class="form">
            <input type="text" placeholder="Email" v-model="state.mail">
            <span v-if="v$.mail.$error">
            {{ v$.mail.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Mot de passe" v-model="state.mdp">
            <span v-if="v$.mdp.$error">
            {{ v$.mdp.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Nom" v-model="state.nom">
            <span v-if="v$.nom.$error">
            {{ v$.nom.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Prenom" v-model="state.prenom">
            <span v-if="v$.prenom.$error">
            {{ v$.prenom.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Age" v-model="state.age">
            <span v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Telephone" v-model="state.tel">
            <span v-if="v$.tel.$error">
            {{ v$.tel.$errors[0].$message }}
            </span>

        </div>

        <div class="form">
            <input type="text" placeholder="Type logement" v-model="state.logement">
            <span v-if="v$.logement.$error">
            {{ v$.logement.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
            <input type="text" placeholder="Adresse" v-model="state.addr">
            <span v-if="v$.addr.$error">
            {{ v$.addr.$errors[0].$message }}
            </span>
        </div>

        <div class="form">
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
            <button placeholder="validatedFormular" @click="signUp"> Valider </button>
        </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha, regex, length } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default{
    
    setup(){
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
                tel:  { required , regex: regex(/^0[1-9][0-9]{8}$/), length(8)},
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
                
                await axios.post("http://localhost:3000/inscription", this.state)
                .then(response => { console.log(1);alert('Form successfully submitted') })
                .catch(error => { console.error(error); });
                console.log(2)
            
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