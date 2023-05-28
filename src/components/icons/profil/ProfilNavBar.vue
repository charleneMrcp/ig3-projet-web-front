<template>

    <aside :class="`${is_expanded && 'is_expanded'}`">
      <div class="logo">
        <img src="../../../images/logo22.png" alt="vue">
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="toggleMenu">
            <span class="material-icons"> keyboard_double_arrow_right </span>
        </button>
      </div>

      <h3> Menu </h3>
      <div class="menu">
        <RouterLink class="button" to="/signIn/recherche">
          <span class="material-icons"> search  </span>
          <span class="text"> Recherche Petsitter </span>
        </RouterLink>

        <RouterLink class="button" to="/signIn/profil">
          <span class="material-icons">person</span>
          <span class="text"> Mon Profil </span>
        </RouterLink>

        <RouterLink class="button" to="/signIn/animal">
          <span class="material-icons">pets</span>
          <span class="text"> Mes Animaux </span>
        </RouterLink>

        <RouterLink class="button" to="/signIn/reservation">
          <span class="material-icons">task</span>
          <span class="text">Mes Reservations  </span>
        </RouterLink>
        
        <RouterLink class="button" to="/signIn/pro">
          <span class="material-icons">work</span>
          <span class="text">Professionel</span>
        </RouterLink>

      </div>

      <div class="flex"></div>

      <div class="menu">
        <button class="material-icons" @click="signOut"> logout </button>
      </div>
      
      
    </aside>
    

</template>

<script>
import { useRouter } from 'vue-router';
import router from '../../../router'; 
import {  ref } from 'vue'

export default{
    setup(){
      const is_expanded = ref(false)

      const toggleMenu= ()=>{
        is_expanded.value = !is_expanded.value
      }
      return{
        is_expanded, toggleMenu
      }
    },
    methods:{
    signOut(){
      localStorage.removeItem('token');
      router.push('/signIn');
    }
  } 
}
</script>


<style scoped lang="scss">


aside{
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 2rem);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-out;

  button{
      font-size: 2rem;
      color: var(--light);
      text-align: center;
             
  }
  

  
  .flex{
    flex: 1 1 0;
  }
  .logo{
    margin-bottom:  1rem;

    img{
      width: 2rem;
    }
  }
  .menu-toggle-wrap{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle{
      transition: 0.2s ease-out;
      .material-icons{
        font-size: 2rem;
        color: var(--light);
      }

      &:hover{
        .material-icons{
          transition: 0.2s ease-out;
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }
  h3, .button .text{
    opacity:0;
    transition: 0.3s ease-out;

  }

 h3{
  color: var(--grey);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
 }


  .menu{
    margin: 0 -1rem;
    .button{
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons{
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }
      .text{
        color:var(--light);
        transition: 0.2s ease-out;
      }
      &:hover, &.router-link-exact-active{
        background-color: var(--dark-alt);
        .material-icons, .text{
          color: var(--primary);
        }
        &.router-link-exact-active{
          border-right: 5px solid var(--primary);
        }
      }
    }
  }
  &.is_expanded{
    width: 300px;
    .menu-toggle-wrap{
      top: -3rem;
      .menu-toggle{
        transform: rotate(-180deg);
      }
    }
    h3, .button .text{
      opacity:1;
      transition: 0.3s ease-out;
   }
   .button{
    .material-icons{
      margin-right: 1rem;
    }
     
   }
  }
  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
    
  }
}

</style>
