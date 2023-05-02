<template>
    <nav class="sidebar">

    <RouterLink to="/signIn/recherche">Recherche Petsitter</RouterLink>
    <RouterLink to="/signIn/profil">Mon profil</RouterLink>
    <RouterLink to="/signIn/animal">Mes animaux</RouterLink>
    <RouterLink to="/signIn/reservation">Mes reservations</RouterLink>

    </nav>
    <button @click="signOut"> Sign Out </button>

</template>

<script>
import { useRouter } from 'vue-router';
import router from '../../../router'; 

export default{
    methods:{
    signOut(){
      localStorage.removeItem('token');
      router.push('/signIn');
    }

  }

  
}
</script>

<style>
</style>