<template>
    <section>
        <toolbar-platforms></toolbar-platforms>
    </section>
</template>

<script>
import ToolbarPlatforms from './ToolbarPlatforms.vue'
export default{
    components:{
       ToolbarPlatforms
    }


}



</script>

<style scoped>
section{
    background: #f1f3f4;
    border-top: 1px solid #dadce0;
    border-bottom: 1px solid #dadce0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(218, 220, 224); 
}

</style>