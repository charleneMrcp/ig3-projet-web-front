<template>
    <div class="update">
        <div class="modif">
            <form @submit.prevent="update">
                
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
                    <input type="text" placeholder="desc" v-model="state.desc_gene">
                    <span v-if="v$.desc_gene.$error">
                    {{ v$.desc_gene.$errors[0].$message }}
                    </span>
                </div>
                        


                <button type="submit"> Modifier </button>

            </form>
           
            

        </div>
        
    </div>
    
</template>

<script>

import { reactive, onMounted, ref , computed} from 'vue'
import useValidate from '@vuelidate/core'
import { required} from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import axios from 'axios'

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

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
      animal, state, v$, getAnimal, id    
    }
  },
  methods:{
        async update(){
            this.v$.$validate()
            if (!this.v$.$error){
                console.log('allez')
                console.log(this.state)
                await axios.put(`/animals/modifAnimal/${this.id}`, this.state)
                .then(async(response) => { 
                    alert('Animal Updated successfully !') ;
                    await this.getAnimal()
                })
                .catch(error => { console.error(error)});
            }
            else{
                alert('Update failed')
            }
            
        },
    },
}


</script>