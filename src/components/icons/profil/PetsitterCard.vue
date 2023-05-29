<template>
    <div class="petsitter-card">
        
        
        <img class="profile-img"  :src="sexe === 'Femme' ? '/src/images/fille.jpg' : '/src/images/garcon.png'" alt="Ceci est la photo du petsitter">

        <div class="name">
            <h1 class="nom"> <slot name="nom"></slot> </h1>
            <h1 class="prenom"><slot name="prenom"></slot></h1>
        </div>
        
        <p class="age"> <slot name="code_post"> </slot> </p>
        
    </div> 
   
</template>

<script>

export default {
  name: "PetsitterCard",
  props: {
    sexe: {
      type: String,
      required: true
    }
  }
}
    
</script>

<style scoped lang="scss">

.name{
    max-width: 90%;
    margin: auto;
    justify-content: center;
    display: flex;
    .nom{
        color:#582391;
        padding-right: 5px;
        font-size: 1rem;
        font-family: 'Fira sans';
    }
    .prenom{
        color:#582391;
        font-size:1rem;
        font-family: 'Fira sans';
    }
}
*{
    box-sizing: border-box;
    font-family: 'Fira sans';
    margin:0;
    padding:0;
    
}
.petsitter-card{
    text-align: center;
    box-shadow: 0px 2px 8px 0px var(--grey);
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    width: 15rem;
    background-color: var(--light);
    transition: all 0.2s ease-in-out; /* add a transition effect */
    
}
.petsitter-card:hover{
    transform:scale(1.03);
}


.profile-img{
  width: 8rem;
  clip-path: circle(60px at center  );
  margin-top: 2.5rem;
}

.age{
    color: #582391;
    margin: 1rem ;
    font-size: 0.9rem;
    overflow: hidden;
    font-family: 'Fira sans';
    
}
@media (max-width: 378px){
    .petsitter-card{
        width:11rem;
    }
    .name{
        display: flex;
        flex-direction: column;
    }
}

</style>