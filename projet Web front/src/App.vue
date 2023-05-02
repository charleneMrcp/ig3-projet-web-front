<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/icons/NavBar.vue'


</script>

<template>

  <NavBar/>
  <div>
      <RouterView/>
  </div>

</template>


<style scoped>
div{
  padding: 20px
}
</style>





