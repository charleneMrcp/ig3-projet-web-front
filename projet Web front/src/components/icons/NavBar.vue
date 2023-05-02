<template>
    <nav class="navbar">

         <RouterLink to="/">Home</RouterLink>
         <RouterLink to="/about">About</RouterLink>
         <RouterLink to="/signUp">Sign Up</RouterLink>
         <RouterLink to="/signIn">Sign In</RouterLink>

  </nav>
  
</template>

<script>
export default{
  name: "NavBar",
}
</script>

<style>

.navbar {
  background-color: white;
  overflow: hidden;
}

.navbar  {
  height: 25%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 20px;
}



.navbar a {
  float: right;
  display: block;
  color: #00bd7e;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
}


</style>
