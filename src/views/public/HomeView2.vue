<template>
    <div class="sec1">
  
        <div class="container">
  
            <h1>Petsitter Pro</h1> 
            
            <h3> Bienvenue sur notre site de Petsitter pour chats et chiens !</h3>
            
            <p>Offrez à votre animal de compagnie le meilleur soin possible pendant votre absence. Chez PetsitterPro, nous comprenons à quel point il est important pour vous de trouver quelqu'un de confiance pour s'occuper de votre compagnon à quatre pattes. Notre plateforme conviviale vous permet de créer un compte personnel et d'accéder à une liste complète de profils de petsitters expérimentés, prêts à prendre soin de votre chat ou chien avec amour et dévouement. </p>
            
            <div class="boutton">
                <router-link class="bt" :to="{name: 'signIn'}" tag="button">Se connecter</router-link>
                <i></i>
            </div> 
         
        </div>
  
      
      
  
  
    </div>
    
       
  
</template>
  
<script setup>
  
  
</script>
  
<style lang="scss" scoped>
   
   .sec1{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
   }
  
  .container{
    margin-top:5%;
    margin-bottom: auto;
    height: 100%;
    background-color: var(--light);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }
  .sec1 h1{
    text-align: center;
    color: #582391;
    font-family: 'Fira sans';
    font-size: 5rem;
    margin-bottom: 30px;

  }
  @media (max-width: 700px){
        .sec1 h1{
            font-size: 3rem;
           
        }
}
  .boutton{
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height:40px;
    width: 150px;
    border-radius: 50px;
    border:1px solid #582391;
    background-color: white;
    font-size: 1.2rem;
    color:#582391;
    z-index:2;
    overflow: hidden;
    margin: auto;
    .bt{
      text-decoration: none;
    }
  
    
  }
  .boutton::before{
      content:"";
      position:absolute;
      height:40px;
      width: 150px;
      border-radius: 50px;
      background-color: #722cbc;
      border: none;
      top: 0px;
      left: -1px;
      transform: translate(-100%);
      transition: 0.3s;
      z-index:-1;
      .bt{
        color:white;
      }
    }
    .sec1.boutton i{
      display: none;
    }
  .boutton:hover::before{
    transform: translate(0%);
    border :none;
    .bt{
        color:white;
      }
  }
  .boutton:hover{
    border:none;
    .bt{
        color:white;
      }
  }

 
  
  
  
  h3{
    text-align: center;
    color:rgb(86, 86, 86);
    width: 50%;
    font-family: 'Fira sans';
    margin: auto;
  }
  p{
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color:rgb(86, 86, 86);
    width: 50%;
    margin-bottom: 20px;;
    font-family: 'Fira sans';
  }
  </style>