<template>
    <div class="animal-card">

        <img class="animal-img"  :src="type === 'Chat' ? '/src/images/chat.png' : '/src/images/chien.png'" alt="Ceci est la photo de l'animal">
        <h3 class="nom"> <slot name="nom"> </slot></h3>
        <p class="type"> <slot name="type"> </slot> </p>
        
        
    </div>
</template>

<script>

export default {
  name: "AnimalCard",
  props: {
    type: {
      type: String,
      required: true
    }
  }
}

    
</script>

<style scoped>
.nom{
    max-width: 90%;
    margin: auto;
    justify-content: center;
    display: flex;
    color: #582391;
    font-family: 'Fira sans';
}

*{
    box-sizing: border-box;
    font-family: 'Fira sans';
    margin:0;
    padding:0;
    
}
.animal-card{
    text-align: center;
    box-shadow: 0px 2px 8px 0px var(--grey);
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    width: 15rem;
    background-color: var(--light);
    transition: all 0.2s ease-in-out; /* add a transition effect */
    
}
.animal-card:hover{
    transform:scale(1.03);
}


.animal-img{
  width: 8rem;
  clip-path: circle(60px at center  );
  margin-top: 4.5rem;
}

.type{
    margin: 1rem ;
    font-size: 0.9rem;
    overflow: hidden; 
    font-family: 'Fira sans';
    color:#582391;
}

</style>