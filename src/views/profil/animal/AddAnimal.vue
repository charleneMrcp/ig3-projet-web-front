<template>
    <h1>Renseignez ces informations</h1>
  
    <div class="formulaireAjout">
        <form @submit.prevent="adding">
            <div class="entree">
                <div class="gauche">
                    <div class="boite">
                        <label for="Nom"> Nom </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Nom" v-model="state.nom_pet">
                            <span class="error" v-if="v$.nom_pet.$error">
                            {{ v$.nom_pet.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
  
                    <div class="boite">
                        <label for="Type"> Type d'animal </label>
                        
                        <input type="radio" id="five" value="Chien" v-model="state.type" />
                        <label for="five">Chien</label>
        
                        <input type="radio" id="six" value="Chat" v-model="state.type" />
                        <label for="six">Chat</label>
                        
                    </div>
  
                    <div class="boite">
                        <label for="sexe"> Sexe </label>
                        
                        <input type="radio" id="seven" value="Mâle" v-model="state.sexe" />
                        <label for="seven">Mâle</label>
        
                        <input type="radio" id="eigth" value="Femelle" v-model="state.sexe" />
                        <label for="eigth">Femelle</label>
                        <span class="error" v-if="v$.sexe.$error">
                        {{ v$.sexe.$errors[0].$message }}
                        </span>
                        
                    </div>
  
                    <div class="boite">
                        <label for="Age"> Age </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Age" v-model="state.age">
                            <span class="error" v-if="v$.age.$error">
                            {{ v$.age.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
  
                    <div class="boite">
                        <label for="Taille"> Taille </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Taille" v-model="state.taille">
                            <span class="error" v-if="v$.taille.$error">
                            {{ v$.taille.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
  
                    <div class="boite">
                        <label for="Poids"> Poids </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Poids" v-model="state.poids">
                            <span class="error" v-if="v$.poids.$error">
                            {{ v$.poids.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>
  
                <div class="droite">
                    <div class="boite">
                        <label for="Race"> Race </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Race" v-model="state.race">
                            <span class="error" v-if="v$.race.$error">
                            {{ v$.race.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
  
                    <div class="boite">
                        <label for="vs_dog"> vs_dog </label>
                        
                        <input type="radio" id="nine" value="true" v-model="state.vs_dog" />
                        <label for="nine">OK</label>
        
                        <input type="radio" id="ten" value="false" v-model="state.vs_dog" />
                        <label for="ten">Not OK</label>
                        
                    </div>
        
                    <div class="boite">
                        <label for="vs_cat"> vs_cat </label>
                        
                        <input type="radio" id="eleven" value="true" v-model="state.vs_cat" />
                        <label for="eleven">OK</label>
        
                        <input type="radio" id="twelve" value="false" v-model="state.vs_cat" />
                        <label for="twelve">Not OK</label>
                        
                    </div>
  
                    <div class="boite">
                        <label for="vs_humain"> vs_humain </label>
                        
                        <input type="radio" id="a" value="true" v-model="state.vs_humain" />
                        <label for="a">OK</label>
        
                        <input type="radio" id="b" value="false" v-model="state.vs_humain" />
                        <label for="b">Not OK</label>
                        
                    </div>
  
                    <div class="boite">
                        <label for="vs_enfants"> vs_enfants </label>
                        
                        <input type="radio" id="c" value="true" v-model="state.vs_enfants" />
                        <label for="c">OK</label>
        
                        <input type="radio" id="d" value="false" v-model="state.vs_enfants" />
                        <label for="d">Not OK</label>
                        
                    </div>
  
                    <div class="boite">
                        <label for="desc_gene"> Description generale </label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="desc..." v-model="state.desc_gene">
                            <span class="error" v-if="v$.desc_gene.$error">
                            {{ v$.desc_gene.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit"> Valider </button>
            <div class="success-message" v-if="success">
                Ajout réussie !
            </div>
            <div class="error" v-if="error">
                Echec de l'ajout de l'animal
            </div>
        </form>
    </div>
</template>
  

<script>
import axios from 'axios';
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../../../router';

const success= ref(false)
const error = ref(false)
export default{
    
    setup(){
        const router = useRouter();
        const state = reactive({
            nom_pet: "",
            type: "Chien",
            sexe: "Mâle",
            taille:  "",
            poids:  "",
            race:  "",
            vs_dog:  true,
            vs_cat:  true,
            vs_humain: true,
            vs_enfants: true,
            desc_gene: "",
        
        })

        const rules = computed(()=> {
            return {
                nom_pet: {required, alpha},
                age: {required, numeric},
                type: {required, alpha},
                sexe: {required},
                taille:  {required, numeric},
                poids:  {required, numeric},
                race:  {required},
                vs_dog:  {required},
                vs_cat:  {required},
                vs_humain: {required},
                vs_enfants: {required},
                desc_gene: {required},
            }
        })

        const v$ = useValidate(rules, state)

        return {
            state,
            v$,
            error,
            success
        }
    },
    methods:{
        async adding(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.post("/animals/newAnimal", this.state)
                .then(response => { 
                    success.value =true
                    error.value = false
                //Réinitialiser le formulaire
                const form = document.querySelector('form');
                form.reset();
                router.push('/signIn/animal')

                })
                .catch(error => { console.error(error); });
                
            
            }
            else{
                success.value =false
                error.value = true
            }
            
        },


       
    },
    
}
</script>
<style lang="scss" scoped>

.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: row;
    
}
.gauche {
    align-items: center;
}

.droite {

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
    width:5rem;
    margin-right: 1rem;
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