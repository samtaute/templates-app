<template>
 
        <preview-block v-for="(element, idx) in blocks" :element="element" :key="idx"></preview-block>

</template>
<script>
import PreviewBlock from './PreviewBlock.vue'

export default{
    components:{
        PreviewBlock
    },
    computed: {
        blocks(){
            return this.$store.getters.blocks; 
        }
    }

}


</script>

<style>


</style>