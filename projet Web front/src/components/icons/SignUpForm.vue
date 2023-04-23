<template>
    <div class="formulaireInscription">      
      
      <h3> Inscription </h3>

      <form action="get">
        <!-- Mail-->
        <label for="Email"> Email </label>
        <input type="text" id="Email">
        <br>
        <!-- Password -->
        <label for="Password"> Password </label>
        <input type="text" id="Password">
        <br>
        <!-- Nom -->
        <label for="Nom"> Nom </label>
        <input type="text" id="Nom">
        <br>
        <!-- Prenom -->
        <label for="Prenom"> Prenom </label>
        <input type="text" id="Prenom">
        <br>
        <!-- Naissance -->
        <label for="Age"> Age </label>
        <input type="text" id="Age">
        <br>
        <!-- Telephone -->
        <label for="Telephone"> Telephone </label>
        <input type="text" id="Telephone">
        <br>
        <!-- Lieu -->
        <label for="Logement"> Logement </label>
        <input type="text" id="Logement">
        <br>
        <!-- Adresse -->
        <label for="Adresse"> Adresse </label>
        <input type="text" id="Adresse">
        <br>
        <!-- Code postal -->
        <label for="Code postal"> Code postal </label>
        <input type="text" id="CodePostal">
        <br>

      </form>
      <br>
      <button id="validatedFormular" @click="getElement"> Valider </button>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: 'SignUpForm',
    data(){
        return{
        
        nom: "",
        prenom: "",
        age: 0,
        tel:  "",
        mail:  "",
        mdp:  "",
        sexe:  "",
        addr:  "",
        code_post: 0,
        logement: ""

        }
    },
    methods:{
        getElement(){

            this.nom= document.getElementById("Nom").value;
            this.prenom= document.getElementById("Prenom").value;
            this.age= parseInt(document.getElementById("Age").value);
            this.tel=  document.getElementById("Telephone").value;
            this.mail=  document.getElementById("Email").value;
            this.mdp= document.getElementById("Password").value;
            this.addr=  document.getElementById("Adresse").value;
            this.code_post= parseInt(document.getElementById("CodePostal").value);
            this.logement= document.getElementById("Logement").value;
            console.log("Ready to send");

            
            axios.post("http://localhost:3000/inscription", this)
            .then(response => { console.log("New user sent"); })
            .catch(error => { console.error(error); });

        },

       
    },
}
</script>