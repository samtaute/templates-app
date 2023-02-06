<template>
    <div>
        <preview-ad-unit  v-if="element.blockType === 'ad_unit'" :element='element' :key="element.blockType"></preview-ad-unit>
        <fotoscape-block v-if="element.blockType==='fotoscape_block'" :element='element' :key="element.blockType"></fotoscape-block>
    </div>
   

</template>
<script>
import FotoscapeBlock from './FotoscapeBlock.vue'
import PreviewAdUnit from './PreviewAdUnit.vue'

export default{
    props: ['element', 'fotoscapeObj'],
    components:{
        FotoscapeBlock,
        PreviewAdUnit,
    }
}


</script>

<style scoped>
</style>