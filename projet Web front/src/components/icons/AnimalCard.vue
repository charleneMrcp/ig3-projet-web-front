<template>
    <div class="animal-card">
        <img src="/src/images/animalProfil.png" alt="Ceci est la photo de l'animal">
        
        <div class="desc">
            <h3> <slot name="nom"> </slot></h3>
            <p> <slot name="type"> </slot> </p>
        </div>
        
    </div>
</template>

<script>

export default{
    name: "AnimalCard"
}
    
</script>

<style scoped>
.animal-card{
    width: 32%;
    height: 30%;
    background-color:rgba(104, 104, 104, 0.65);
    text-align: center;
    padding: 10px;
    margin: 10px;
}

.animal-card .desc p{
    color: white;
    margin: 0px;
    padding: 0px;
}

.animal-card .desc h3{
    color: white;

    font-weight: bold;
    margin: 0px;
}


img{
    width:90%;
    height: 60%;

}

</style>