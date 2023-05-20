<template>
    <div v-if="isPro">
      
      <button @click="supprimer">Supprimer le compte Pro </button>
      <ReservDisplay>
        
      </ReservDisplay> 
      

    </div>
    <div v-else>
        <FormPetsitter/>
    </div>  
</template>

<script>
import axios from 'axios';
import { reactive, onMounted, ref , computed} from 'vue'
import FormPetsitter from '../../components/pro/FormPetsitter.vue'
import ReservDisplay from './ReservDisplay.vue'


export default{
    
    setup(){
        const state= ref({})

        const getUser= async()=>{
            
            await axios.get('/user/info')
            .then((response)=>{
                state.value = response.data.is_sitter
                
            })
            .catch(err => console.log(err))
        }
        const isPro = computed(() => {
            return state.value === true
        })
        onMounted(()=>{
            getUser()
            
        })

        return{
            state, isPro
        }
        
    },
    methods:{
            async supprimer(){
                await axios.delete('/petsitters/deletePetsitter')
                .then((response)=>{
                    alert('you deleted your pro account')
                    location.reload()
                })
            }
        },
    components: {FormPetsitter, ReservDisplay },
}

</script>

<style scoped lang="scss">

button{
    font-size: 1rem;
    font-family: 'Fira sans';
    color: var(--light)  ;
    background-color: var(--primary) ;
    padding: 0.5rem; 
    
}
button:hover{
    background-color: mediumpurple ;
}
</style>