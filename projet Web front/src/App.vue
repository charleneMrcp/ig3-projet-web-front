<script setup>
import { RouterLink, RouterView } from 'vue-router'



</script>

<template>
  <div class="app">
    <RouterView/>
  </div>
  
</template>


<style lang="scss">
:root{
    --primary: rgb(83, 83, 206);
    --grey: #64748b;
    --dark: #1e293b;
    --dark-alt: #334155;
    --light: #f1f5f9;
    --sidebar-width: 300px;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

button{
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

</style>





