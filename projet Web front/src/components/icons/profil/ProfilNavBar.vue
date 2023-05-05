<template>

    <div class="navbar">
      <ul>
        <li><RouterLink to="/signIn/recherche">Recherche Petsitter</RouterLink></li>
        <li><RouterLink to="/signIn/profil">Mon profil</RouterLink></li>
        <li><RouterLink to="/signIn/animal">Mes animaux</RouterLink></li>
        <li><RouterLink to="/signIn/reservation">Mes reservations</RouterLink></li>
        <li><RouterLink to="/signIn/pro"> Pro </RouterLink></li>
        <li><button @click="signOut"> Sign Out </button></li>
      </ul>
    </div>
    

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


<style scoped>

.navbar {
  width:20%;
  height:100%;
  font-size: 20px;
  border-right: solid 1px black;
}



.navbar a {
  color: #00bd7e;
  text-decoration: none;
}

.navbar a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
}
li{
  list-style-type: none;
}

</style>
