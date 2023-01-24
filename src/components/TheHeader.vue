<template>
    <header id="header">
        <div class="header-title"><h4>Templates</h4></div>
        <content-container-ribbon></content-container-ribbon>
    </header>
    
</template>
<script>
import ContentContainerRibbon from './ContentContainerRibbon.vue'

export default{
    components:{
        ContentContainerRibbon
    }

}

</script>
<style scoped>
    #header{
        background: #f1f3f4;
        height: 6.5rem; 
        width: 100%; 
        position: fixed; 
        top: 0; 
        z-index: 9999;
        display: flex; 
    }
    .header-title{
        align-items: center;
        justify-content: left;
        width: 100%;
        display: flex; 
        height: 3rem; 
        
    }

</style>