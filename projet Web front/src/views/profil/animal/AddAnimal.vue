<template>
    <div class="formulaireAjout">      
      
      <h3> AJOUT </h3>

      <form @submit.prevent="adding" >
        <div>
            <label for="Nom"> Nom </label>
            <input type="text" placeholder="Nom" v-model="state.nom_pet">
            <span v-if="v$.nom_pet.$error">
                {{ v$.nom_pet.$errors[0].$message }}
            </span>
        </div>

        <div class="check">
            <label for="Type"> Type d'animal </label>

            <input type="radio" id="five" value="Chien" v-model="state.type" />
            <label for="five">Chien</label>

            <input type="radio" id="six" value="Chat" v-model="state.type" />
            <label for="six">Chat</label>            
        </div>

        <div class="check">
            <input type="radio" id="seven" value="Mâle" v-model="state.sexe" />
            <label for="seven">Mâle</label>

            <input type="radio" id="eigth" value="Femelle" v-model="state.sexe" />
            <label for="eigth">Femelle</label>

            <span v-if="v$.sexe.$error">
            {{ v$.sexe.$errors[0].$message }}
            </span>
        </div>

        <div>
            <label for="Age"> Age </label>
            <input type="text" placeholder="Age" v-model="state.age">
            <span v-if="v$.age.$error">
            {{ v$.age.$errors[0].$message }}
            </span>

        </div>

        <div>
            <label for="Taille"> Taille </label>
            <input type="text" placeholder="Taille" v-model="state.taille">
            <span v-if="v$.taille.$error">
            {{ v$.taille.$errors[0].$message }}
            </span>
        </div>
        <div>
            <label for="Poids"> Poids </label>
            <input type="text" placeholder="Poids" v-model="state.poids">
            <span v-if="v$.poids.$error">
            {{ v$.poids.$errors[0].$message }}
            </span>
        </div>
        <div>
            <label for="Race"> Race </label>
            <input type="text" placeholder="Race" v-model="state.race">
            <span v-if="v$.race.$error">
            {{ v$.race.$errors[0].$message }}
            </span>
        </div>

        
        <div class="check">
            <label for="vs_dog"> vs_dog </label>

            <input type="radio" id="nine" value="true" v-model="state.vs_dog" />
            <label for="nine">OK</label>

            <input type="radio" id="ten" value="false" v-model="state.vs_dog" />
            <label for="ten">Not OK</label>

            
        </div>
        <div class="check">
            <label for="vs_cat"> vs_cat </label>

            <input type="radio" id="eleven" value="true" v-model="state.vs_cat" />
            <label for="eleven">OK</label>

            <input type="radio" id="twelve" value="false" v-model="state.vs_cat" />
            <label for="twelve">Not OK</label>

            
        </div>
        <div class="check">
            <label for="vs_humain"> vs_humain </label>

            <input type="radio" id="a" value="true" v-model="state.vs_humain" />
            <label for="a">OK</label>

            <input type="radio" id="b" value="false" v-model="state.vs_humain" />
            <label for="b">Not OK</label>

            
        </div>
        <div class="check">
            <label for="vs_enfants"> vs_enfants </label>

            <input type="radio" id="c" value="true" v-model="state.vs_enfants" />
            <label for="c">OK</label>

            <input type="radio" id="d" value="false" v-model="state.vs_enfants" />
            <label for="d">Not OK</label>

            
        </div>

        

        <div class="form">
            <label for="desc_gene"> Description generale </label>
            <input type="text" placeholder="desc..." v-model="state.desc_gene">
            <span v-if="v$.desc_gene.$error">
            {{ v$.desc_gene.$errors[0].$message }}
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
import router from '../../../router';

export default{
    
    setup(){
        const router = useRouter();
        const state = reactive({
            nom_pet: "",
            type: "",
            sexe: null,
            taille:  "",
            poids:  "",
            race:  "",
            vs_dog:  "",
            vs_cat:  "",
            vs_humain: "",
            vs_enfants: "",
            desc_gene: "",
        
        })

        const rules = computed(()=> {
            return {
                nom_pet: {required},
                age: {required},
                type: {required},
                sexe: {required},
                taille:  {required},
                poids:  {required},
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
        }
    },
    methods:{
        async adding(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.post("/animals/newAnimal", this.state)
                .then(response => { 
                alert('Form successfully submitted');
                //Réinitialiser le formulaire
                const form = document.querySelector('form');
                form.reset();
                router.push('/signIn/animal')

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