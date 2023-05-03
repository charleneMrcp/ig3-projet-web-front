<template>

    <h1> This is the profil View</h1>

    <div class="profil">
        <h1> Welcome {{ user.nom }} !</h1>

        <div class="modif">
            <form @submit.prevent="update">
                
                <div>
                    <label for="Nom"> Nom </label>
                    <input type="text" :placeholder="user.nom" v-model="state.nom">
                     <span v-if="v$.nom.$error">
                        {{ v$.nom.$errors[0].$message }}
                    </span>
                </div>
                <div>
                    <label for="Prenom"> Prenom </label>
                    <input type="text" :placeholder="user.prenom" v-model="state.prenom">
                    <span v-if="v$.prenom.$error">
                         {{ v$.prenom.$errors[0].$message }}
                    </span>
                </div>

                <div>
                    <label for="Age"> Age </label>
                    <input type="text" :placeholder="user.age" v-model="state.age">
                    <span v-if="v$.age.$error">
                        {{ v$.age.$errors[0].$message }}
                    </span>
                </div>

                <div>
                    <label for="Telephone"> Telephone </label>
                    <input type="tel" :placeholder="user.tel" v-model="state.tel">
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

                <div>
                    <label for="Adresse"> Adresse </label>
                    <input type="text" :placeholder="user.addr" v-model="state.addr">
                    <span v-if="v$.addr.$error">
                        {{ v$.addr.$errors[0].$message }}
                    </span>
                </div>

                <div >
                    <label for="code_post"> Code postal </label>
                    <input type="text" :placeholder="user.code_post" v-model="state.code_post">
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
                        


                <button type="submit"> Modifier </button>

            </form>
           
            

        </div>
        
    </div>
    
</template>

<script>
import { VueElement } from 'vue'
import { reactive, onMounted, ref , computed} from 'vue'
import useValidate from '@vuelidate/core'
import { required, email, numeric , alpha } from '@vuelidate/validators'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from '../../router'
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

export default {
   setup() {         
    const state = reactive({
        nom: "",
        prenom: "",
        age: null,
        tel:  "",
        mail:  "",
        sexe:  "",
        addr:  "",
        code_post: null,
        logement: "",
    })

    const rules = computed(()=> {
            return {
                nom: { required, alpha  },
                mail:{required, email},
                prenom: { required, alpha  },
                age: { required, numeric },
                tel:  { required, },                               
                sexe:{ required },
                addr:  { required },
                code_post: { required, numeric },
                logement: { required }
            }
    })
    const v$ = useValidate(rules, state)


    const user = ref({});
    const getUser= () =>{
        axios.get('/user/info')
        .then((response) => {
        console.log(response.data)
        user.value = response.data
        state.mail= user.value.mail;
        state.nom = user.value.nom;
        state.prenom = user.value.prenom;
        state.age = user.value.age;
        state.tel = user.value.tel;
        state.addr = user.value.addr;
        state.code_post = user.value.code_post;
        state.logement = user.value.logement;
        state.sexe = user.value.sexe;
        
      })
    }
    onMounted(() => {
      getUser()
    })

    return {
      user, state, v$, getUser    
    }
  },


  methods:{
        async update(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.put("/user/modification", this.state)
                .then(async(response) => { 
                    alert('User Updated successfully !') ;
                    await this.getUser()
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
