<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/icons/NavBar.vue'


</script>

<template>

  <Navbar/>
  <div>
      <RouterView/>
  </div>

</template>


<style scoped>
div{
  padding: 20px
}
</style>





