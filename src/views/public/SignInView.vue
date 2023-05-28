<template>
    
    <div class="formulaire">
        <div class="image">
            <img src="/src/images/logo22.png" alt="Ceci est l'image de connexion"/>  
        </div>
        <SignInForm/>
    </div>
    
    
</template>

<script setup>
import { VueElement } from 'vue';
import SignInForm from '../../components/public/SignInForm.vue';



</script>

<style scoped>
.formulaire {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centre le contenu verticalement */
  align-items: center; /* Centre le contenu horizontalement */
  background-color: rgb(235, 234, 234);
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
}
@media (max-width: 599px){
    .formulaire {
        width:99%
    }
}
.image {
  margin-top: 10px;
  text-align: center; /* Centre l'image horizontalement */
  height: 10rem;
  border-radius: 50%; /* Arrondit les coins pour créer une forme de cercle */
  overflow: hidden; /* Masque le contenu qui dépasse du cercle */

}

.image img {
  max-width: 100%; /* Ajuste la largeur maximale de l'image */
  max-height: 100%; /* Ajuste la hauteur automatiquement pour maintenir les proportions */
  object-fit: cover; /* Ajuste l'image pour remplir le cercle */
}

</style>