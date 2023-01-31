<template>
    <div>
        <preview-block v-for="element in blocks" :element="element" :key="element.blockType"></preview-block>
    </div>

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