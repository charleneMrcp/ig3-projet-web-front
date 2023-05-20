<template>
    <nav class="menu-nav">

      <ul class="menu-indicator">

       <li class="menu-items"><RouterLink  class="menu-link"  to="/">Home</RouterLink> </li> 
       <li class="menu-items"><RouterLink  class="menu-link" to="/signUp">Sign Up</RouterLink> </li> 
       <li class="menu-items"> <RouterLink class="menu-link"  to="/signIn">Sign In</RouterLink></li> 
    
      </ul>

    </nav>
  
</template>

<script>
export default{
  name: "NavBar",
}
</script>

<style lang="scss">

.menu-nav{
  padding: 0;
  margin: 0;
  position: relative;
  background-color: var(--dark);
  display: flex;
  
  
  .menu-indicator{
    width: 100%;
    display: inline-flex;
    list-style-type: none;
    justify-content: center;
    
    .menu-items{
      display: inline-flex;

      .menu-link{
        display: inline-flex;
        padding: 0.75rem 1rem;
        color: var(--light);
        text-decoration: none;


        &:hover, &.router-link-exact-active{
        background-color: var(--dark-alt);
        color:var(--primary);
        }
        &.router-link-exact-active{
          border-bottom: 5px solid var(--primary);
        }
      }
      

      
    }
  }
}


</style>
