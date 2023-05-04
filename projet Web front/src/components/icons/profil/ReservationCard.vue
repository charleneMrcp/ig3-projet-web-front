<template>
    <div class="reserv-card">            
        <p> Id petsitter: <slot name="sitter"> </slot> </p>
        <p> Date de debut: <slot name="date_debut"> </slot></p>
        <p> Date de fin:<slot name="date_fin"> </slot></p>
        <p> Heure de debut:<slot name="h_debut"> </slot></p>
        <p> Heure de fin:<slot name="h_fin"> </slot></p>
        <p> Animal concerné: <slot name="pet_id"> </slot></p>
        <p> Description:<slot name="quick_desc"> </slot> </p>
        <p> Validation: <slot name="validation"> </slot></p>

    </div>
</template>

<script>

export default{
    name: "ReservationCard",
    
}
    
</script>

<style scoped>
.reserv-card{
    border: solid 1px black;
}

</style>