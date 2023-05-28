<template>

    <div class="profil">
        <div class="contain">
            <h1>Votre profil</h1>
            <img class="image" :src="state.sexe === 'Femme' ? '/src/images/fille.jpg' : '/src/images/garcon.png'" alt="Ceci est la photo du profil" />
        </div>

        <div class="modif">
            <form @submit.prevent="update">
                <div class="entree">
                    <div class="gauche">

                        <div class="boite">
                        <label for="Identite"> Identité </label>
                        <input type="radio" id="one" value="Homme" v-model="state.sexe" />
                        <label for="one">Homme</label>
                        <input type="radio" id="two" value="Femme" v-model="state.sexe" />
                        <label for="two">Femme</label>
                        
                        <span class="error" v-if="v$.sexe.$error">
                            {{ v$.sexe.$errors[0].$message }}
                        </span>
                    </div>
                    <div class="boite">
                        <label for="Nom"> Nom </label>
                        <div class="input-wrapper">
                            <input type="text" :placeholder="user.nom" v-model="state.nom">
                            <span class="error" v-if="v$.nom.$error">
                            {{ v$.nom.$errors[0].$message }}
                            </span>
                        </div>
                    </div>

                    <div class="boite">
                        <label for="Prenom"> Prenom </label>
                        <div class="input-wrapper">
                            <input type="text" :placeholder="user.prenom" v-model="state.prenom">
                            <span class="error" v-if="v$.prenom.$error">
                            {{ v$.prenom.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                    <div class="boite">
                        <label for="Age"> Age </label>
                        <div class="input-wrapper">
                            <input type="text" :placeholder="user.age" v-model="state.age">
                            <span class="error" v-if="v$.age.$error">
                            {{ v$.age.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="droite">
                    <div class="boite">
                        <label for="Telephone"> Telephone </label>
                        <div class="input-wrapper">
                            <input type="tel" :placeholder="user.tel" v-model="state.tel">
                            <span class="error" v-if="v$.tel.$error">
                            {{ v$.tel.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                    <div class="boite">
                        <label for="Logement"> Logement </label>
                    
                        <input class="check" type="radio" id="three" value="Appartement" v-model="state.logement" />
                        <label for="three">Appartement</label>

                        <input class="check" type="radio" id="four" value="Maison" v-model="state.logement" />
                        <label for="four">Maison</label>
                    
                    </div>
                    <div class="boite">
                        <label for="Adresse"> Adresse </label>
                        <div class="input-wrapper">
                            <input type="text" :placeholder="user.addr" v-model="state.addr">
                            <span class="error" v-if="v$.addr.$error">
                            {{ v$.addr.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                    <div class="boite">
                        <label for="code_post"> Code postal </label>
                        <div class="input-wrapper">
                            <input type="text" :placeholder="user.code_post" v-model="state.code_post">
                            <span class="error" v-if="v$.code_post.$error">
                            {{ v$.code_post.$errors[0].$message }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit"> Enregistrer les modifications  </button>
            <div class="success-message" v-if="success">
                    Modification réussie !
            </div>
            <div class="error" v-if="error">
                    Echec de la modification !
            </div>
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

const success= ref(false)
const error =ref(false)
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
      user, state, v$, getUser, success , error
    }
  },


  methods:{
        async update(){
            this.v$.$validate()
            if (!this.v$.$error){
                
                await axios.put("/user/modification", this.state)
                .then(async(response) => { 
                    success.value = true
                    error.value =false
                    await this.getUser()
                })
                .catch(error => { console.error(error)});
            }
            else{
                error.value = true
                success.value =false
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
</style>