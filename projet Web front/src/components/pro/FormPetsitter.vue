<template>
    <h1>You're not a pro !</h1>
    <h2>Become one ! It's fun !</h2>

    <form @submit.prevent="inscription">

        <div>
            <label for="vehicule">Véhicule :</label>
            <input id="vehicule" type="checkbox" v-model="element.vehicule">
        </div>
        <div>
            <label for="surface">Surface (en m²) :</label>
            <input id="surface" type="number" v-model.number="element.surface">
        </div>
        <div>
            <label for="exp_desc">Description de l'expérience :</label>
            <input id="exp_desc" type="text" v-model="element.exp_desc">
        </div>
        <div>
            <label for="loge_desc">Description de l'hébergement :</label>
            <input id="loge_desc" type="text" v-model="element.loge_desc">
        </div>
        <div>
            <label for="motiv_desc">Description de votre motivation :</label>
            <input id="motiv_desc" type="text" v-model="element.motiv_desc">
        </div>
        <div>
            <label for="exterieur">Espace extérieur :</label>
            <input id="exterieur" type="checkbox" v-model="element.exterieur">
        </div>
        <button type="submit"> Valider </button>
    </form>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted, ref , computed} from 'vue'

export default{
    
    setup(){
        const element=reactive({
            vehicule: null,
            surface:null ,
            exp_desc:"" ,
            loge_desc: "",
            motiv_desc:"" ,
            exterieur: null,
        })

        return{
            element
        }
    },
    methods:{
        async inscription(){
            await axios.post('/petsitters/newPetsitter', this.element)
            .then((response)=>{
                alert('You are now a pro ! Find your reservations on the next page')
                location.reload()
            })
        }
    }
}
</script>