<template>
    <div class="update">
        <div class="contain">
            <h1>{{ state.nom_pet }}</h1>
            <img class="image"  :src="state.type === 'Chat' ? '/src/images/chat.png' : '/src/images/chien.png'" alt="Ceci est la photo de l'animal">
        </div>

        <div class="modif">
            <form @submit.prevent="update">
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
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="five" value="Chien" v-model="state.type" />
                            <label for="five">Chien</label>

                            <input class="check" type="radio" id="six" value="Chat" v-model="state.type" />
                            <label for="six">Chat</label>
                        </div>
                        </div>

                        <div class="boite">
                        <label for="Type"> Sexe </label>
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="seven" value="Mâle" v-model="state.sexe" />
                            <label for="seven">Mâle</label>

                            <input class="check" type="radio" id="eigth" value="Femelle" v-model="state.sexe" />
                            <label for="eigth">Femelle</label>
                        </div>
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
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="nine" value="true" v-model="state.vs_dog" />
                            <label for="nine">OK</label>

                            <input class="check" type="radio" id="ten" value="false" v-model="state.vs_dog" />
                            <label for="ten">Not OK</label>
                        </div>
                        </div>
                        <div class="boite">
                        <label for="vs_cat"> vs_cat </label>
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="eleven" value="true" v-model="state.vs_cat" />
                            <label for="eleven">OK</label>

                            <input class="check" type="radio" id="twelve" value="false" v-model="state.vs_cat" />
                            <label for="twelve">Not OK</label>
                        </div>
                        </div>
                        <div class="boite">
                        <label for="vs_humain"> vs_humain </label>
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="a" value="true" v-model="state.vs_humain" />
                            <label for="a">OK</label>

                            <input class="check" type="radio" id="b" value="false" v-model="state.vs_humain" />
                            <label for="b">Not OK</label>
                        </div>
                        </div>
                        <div class="boite">
                        <label for="vs_enfants"> vs_enfants </label>
                        <div class="input-wrapper">
                            <input class="check" type="radio" id="c" value="true" v-model="state.vs_enfants" />
                            <label for="c">OK</label>

                            <input class="check" type="radio" id="d" value="false" v-model="state.vs_enfants" />
                            <label for="d">Not OK</label>
                        </div>
                        </div>

                        <div class="boite">
                        <label for="desc_gene"> Description generale </label>
                        <div class="input-wrapper">
                            <textarea class="check" placeholder="desc" v-model="state.desc_gene"></textarea>
                            <span class="error" v-if="v$.desc_gene.$error">
                            {{ v$.desc_gene.$errors[0].$message }}
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
                <button type="submit"> Modifier </button>
                <div class="success-message" v-if="success">
                    Modification réussie !
                </div>
                <div class="error" v-if="error">
                    Echec de la modification
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>

import { reactive, onMounted, ref , computed} from 'vue'
import useValidate from '@vuelidate/core'
import { required, alpha, numeric} from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import axios from 'axios'

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');
const success=ref(false)
const error=ref(false)
export default {
   setup() {   
    const route = useRoute()
    const id = route.params.id;      
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
                age: {required, numeric},
                type: {required},
                sexe: {required},
                taille:  {required, numeric},
                poids:  {required, numeric},
                race:  {required, alpha},
                vs_dog:  {required},
                vs_cat:  {required},
                vs_humain: {required},
                vs_enfants: {required},
                desc_gene: {required},
            }
    })
    const v$ = useValidate(rules, state)


    const animal = ref({});
    const getAnimal= async() =>{
        
        await axios.get(`/animals/animal/${id}`)
        .then((response) => {
        console.log(response.data);
        animal.value = response.data;
        state.nom_pet= animal.value.nom_pet;
        state.age= animal.value.age;
        state.type= animal.value.type;
        state.sexe= animal.value.sexe;
        state.taille=  animal.value.taille;
        state.poids= animal.value.poids;
        state.race=  animal.value.race;
        state.vs_dog=  animal.value.vs_dog;
        state.vs_cat=  animal.value.vs_cat;
        state.vs_humain= animal.value.vs_humain;
        state.vs_enfants=animal.value.vs_enfants;
        state.desc_gene= animal.value.desc_gene;
    
      })
    }

    onMounted(() => {
      getAnimal()
    })

    return {
      animal, state, v$, getAnimal, id, error,success   
    }
  },
  methods:{
        async update(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                console.log(this.state)
                await axios.put(`/animals/modifAnimal/${this.id}`, this.state)
                .then(async(response) => { 
                    success.value =true
                    error.value = false
                    await this.getAnimal()
                })
                .catch(error => { console.error(error)});
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

.contain {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.image{
    width:7rem;
    height: auto;
    display:inline;
    margin: auto;
    padding-top: 1rem;
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
.check{
    margin-left: 0.5rem;  
    color:grey;  
}

</style>
