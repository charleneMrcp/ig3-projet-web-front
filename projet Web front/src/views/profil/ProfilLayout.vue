<template> 

    <div class="user"> 
        <ProfilNavBar/>
        <div class="main">
            <RouterView/>
        </div>
        
        
    </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import ProfilNavBar from '../../components/icons/profil/ProfilNavBar.vue';

import axios from 'axios'

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

export default{
    name: 'ProfilLayout',
    components:{
        ProfilNavBar,
    }
}

</script>

<style lang="scss">
.user{
    display: flex;
    border: solid 1px black ; 
}

.main{
    flex: 1 1 0;
    padding:2rem;

    @media (max-width: 768px){
      padding-left: 6rem;
    }


  }
</style>