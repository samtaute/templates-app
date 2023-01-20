<template>
    <header id="header">
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
        height: 6rem; 
        width: 100%; 
        position: fixed; 
        top: 0; 
        z-index: 9999;
        display: flex; 
        justify-content: center;
        align-items: center;
    }

</style>