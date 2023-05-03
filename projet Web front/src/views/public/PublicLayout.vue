<template> 

    <div class="public">      
        <NavBar/>
        <RouterView/>
    </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from '../../components/public/NavBar.vue';
import axios from 'axios';
axios.defaults.headers.common['Authorization']= 'Bearer '+ localStorage.getItem('token');

export default{
    name: 'PublicLayout',
    components:{
        NavBar,
    }
}

</script>

<style>
</style>