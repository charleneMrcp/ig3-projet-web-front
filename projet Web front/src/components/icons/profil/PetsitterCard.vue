<template>
    <div class="petsitter-card">
        <img src="/src/images/iconhumain.png" alt="Ceci est la photo du petsitter">
        
        <div class="desc">
            <h2> <slot name="nom"> </slot></h2>
            <h3> <slot name="prenom"> </slot></h3>
            <p> <slot name="age"> </slot> </p>
        </div>
        
    </div>
</template>

<script setup>


    
</script>

<style scoped>
.petsitter-card{
    width: 60px;
    height: 80px;
    background-color:rgba(104, 104, 104, 0.65);
    text-align: center;
    padding: 10px;
    margin: 10px;
}

.petsitter-card .desc p{
    color: white;
    margin: 0px;
    padding: 0px;
}

.petsitter-card .desc h3{
    color: white;

    font-weight: bold;
    margin: 0px;
}


img{
    width:90%;
    height: 60%;

}

</style>