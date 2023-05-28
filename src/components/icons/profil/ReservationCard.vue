<template>
    <div class="reserv-card">

        <img class="image" :src="validation === true ? '/src/images/valider.png' : '/src/images/nonvalider.png'" alt="Image de l'etat de la reservation">            
        
        <div class="gauche">
            <div class="boite">

                <h3>Petsitter:</h3>
                
                <div class="name">
                    <p><slot name="sitter_nom"> </slot></p>
                    <p><slot name="sitter_prenom"> </slot></p>
                </div>
            </div>
            <div class="boite">
                <h3>Animal concerné:</h3>
                <p><slot name="nom_pet"> </slot></p>
            </div>
        </div>
        <div class="droite">
            <div class="boite">
                <h3>Date de debut:</h3>
                <p>  <slot name="date_debut"> </slot></p>
            </div>
            <div class="boite">
                <h3>Date de fin:</h3>
                 <p> <slot name="date_fin"> </slot></p>
            </div>
            <div class="boite">
                <h3>Heure de debut:</h3>
                <p><slot name="h_debut"> </slot></p>
            </div>
            <div class="boite">
                <h3>Heure de fin:</h3>
                <p> <slot name="h_fin"> </slot></p>
            </div>
            

        </div>
        
        
        
        

    </div>
</template>

<script>

export default{
    name: "ReservationCard",
    props: {
    validation: {
      type: Boolean,
      required: true
    }
  }
}
    
</script>

<style scoped lang="scss">
.reserv-card{
    text-align: center;
    box-shadow: 0px 2px 8px 0px var(--grey);
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    margin:auto;
    background-color: var(--light);
    transition: all 0.2s ease-in-out; /* add a transition effect */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    
}
.reserv-card:hover{
    background-color: rgb(226, 226, 226);
}

.image{
    width:7rem;
    height: auto;
    display:inline;
    margin-bottom: 1rem;
    padding-top: 1rem;
}
.name{
    max-width: 90%;
    margin: auto;
    justify-content: center;
    display: flex;
    
    p{
        padding-left: 5px;
    }
}
.boite{
    margin:0.5rem;
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    h3{
      padding-right: 5px;
      color: mediumpurple;
      font-size: 1rem;
      font-family: 'Fira sans'; 
    }
    p{
      max-width: 8rem;
      color: grey;
      font-family: 'Fira sans'; 
      font-size: 1rem;
    }
    
    
}
</style>