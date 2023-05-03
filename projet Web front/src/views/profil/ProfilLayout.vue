<template> 
    <UserHeader/>
    <div class="user"> 
        <ProfilNavBar/>
        <div class="us_contain">
            <RouterView/>
        </div>
        
        
    </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import ProfilNavBar from '../../components/icons/profil/ProfilNavBar.vue';
import UserHeader from '../../components/icons/profil/UserHeader.vue';
import axios from 'axios'

axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

export default{
    name: 'ProfilLayout',
    components:{
        ProfilNavBar, UserHeader,
    }
}

</script>

<style>
.user{
    display: flex;
    border: solid 1px black ; 
}
.us_contain{
    
    width:100%;
    padding: 10px;
    
}
</style>