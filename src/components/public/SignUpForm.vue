<template>
     <div class="formulaireInscription">
        <form @submit.prevent="signUp">
        <div class="entree">
            <div class="gauche">
                <div class="boite">
                    <label for="Email">Email:</label>
                    <div class="input-wrapper">
                    <input type="mail" placeholder="Email" v-model="state.mail">
                    <span v-if="v$.mail.$error" class="error-message">{{ v$.mail.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="Password">Mot de passe:</label>
                    <div class="input-wrapper">
                    <input type="password" placeholder="Mot de passe" v-model="state.mdp">
                    <span v-if="v$.mdp.$error" class="error-message">{{ v$.mdp.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="Nom">Nom:</label>
                    <div class="input-wrapper">
                    <input type="text" placeholder="Nom" v-model="state.nom">
                    <span v-if="v$.nom.$error" class="error-message">{{ v$.nom.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="Prenom">Prénom:</label>
                    <div class="input-wrapper">
                    <input type="text" placeholder="Prenom" v-model="state.prenom">
                    <span v-if="v$.prenom.$error" class="error-message">{{ v$.prenom.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="Age">Age:</label>
                    <div class="input-wrapper">
                    <input type="text" placeholder="Age" v-model="state.age">
                    <span v-if="v$.age.$error" class="error-message">{{ v$.age.$errors[0].$message }}</span>
                    </div>
                </div>
            </div>
            <div class="droite">
                <div class="boite">
                    <label for="Telephone">Téléphone</label>
                    <div class="input-wrapper">
                    <input type="tel" placeholder="Telephone" v-model="state.tel">
                    <span v-if="v$.tel.$error" class="error-message">{{ v$.tel.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="Adresse">Adresse:</label>
                    <div class="input-wrapper">
                    <input type="text" placeholder="Adresse" v-model="state.addr">
                    <span v-if="v$.addr.$error" class="error-message">{{ v$.addr.$errors[0].$message }}</span>
                    </div>
                </div>
                <div class="boite">
                    <label for="code_post">Code postal:</label>
                    <div class="input-wrapper">
                    <input type="text" placeholder="Code Postal" v-model="state.code_post">
                    <span v-if="v$.code_post.$error" class="error-message">{{ v$.code_post.$errors[0].$message }}</span>
                    </div>
                </div>

                
                <div class="boite">
                    <label class="enleve" for="Logement">Type de logement:</label>

                    <input type="radio" id="three" value="Appartement" v-model="state.logement" />
                    <label class="enleve" for="three">Appartement</label>

                    <input type="radio" id="four" value="Maison" v-model="state.logement" />
                    <label class="enleve" for="four">Maison</label>

                    
                </div>

                

                <div class="boite">
                    <label class="enleve" for="identite">Identité:</label>
                    <input type="radio" id="one" value="Homme" v-model="state.sexe" />
                    <label class="enleve" for="one">Homme</label>

                    <input type="radio" id="two" value="Femme" v-model="state.sexe" />
                    <label class="enleve" for="two">Femme</label>

                    <span v-if="v$.sexe.$error">
                    {{ v$.sexe.$errors[0].$message }}
                    </span>
                    
                </div>
            </div>
        </div>
        
        <div class="form">
            <button type="submit"> Valider </button>
        </div>
        <div class="error-message" v-if="fail">
            Echec de l'inscription !
        </div>
        <div class="success-message" v-if="success">
            Inscription réussie !
        </div>
        <div class="error-message" v-if="mailerror">
            Mail déjà utilisé
        </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { reactive, computed,ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../router';

const fail= ref(false)
const success = ref(false)
const mailerror = ref(false)
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
            sexe:  "Femme",
            addr:  "",
            code_post: null,
            logement: "Appartement",
        
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
            fail,
            success,
            mailerror
        }
    },
    methods:{
        async signUp(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.post("user/inscription", this.state)
                .then(response => { 
            
                success.value = true
                fail.value = false
                //Réinitialiser le formulaire
                const form = document.querySelector('form');
                form.reset();
                router.push('/signIn')

                })
                .catch(error => { 
                    
                    mailerror.value = true
                    
                    console.error(error); 
                });
                
            
            }
            else{
                fail.value = true
                success.value = false
            }
            
        },


       
    },
    
}
</script>


<style lang="scss" scoped>



.boite{
    margin:1rem;
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
.gauche {
    align-items: center;
}

.droite {

    align-items: center;
}

.enleve{
    margin:0px;
    padding: 0px;
}




.entree{
    border-radius: 3px;
    background-color: rgb(235, 234, 234) ;
    width:80%;
    padding: 1rem;
    margin: auto;
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
    margin-top: 1rem;
    
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
    width:6rem;
    margin-right: 1rem;
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
@media (max-width: 588px){
    .entree{
        width:100%
    }
}
</style>