<template>
    <div>
        
        <fotoscape-block v-if="element.blockType==='fotoscape_block'" :count="element.settings.count" :key="element.blockType"></fotoscape-block>
    </div>
   

</template>
<script>
import FotoscapeBlock from './FotoscapeBlock.vue'
export default{
    props: ['element', 'fotoscapeObj'],
    components:{
        FotoscapeBlock
    }
}


</script>

<style scoped>
</style>