<template>
    <div>
        <preview-block-header v-if="element.blockType === 'header_block'" :element='element' :key="element.blockType"></preview-block-header> 
        <preview-ad-unit  v-if="element.blockType === 'ad_unit'" :element='element' :key="element.blockType"></preview-ad-unit>
        <fotoscape-block v-if="element.blockType==='fotoscape_block'" :element='element' :key="element.blockType"></fotoscape-block>
    </div>
   

</template>
<script>
import FotoscapeBlock from './FotoscapeBlock.vue'
import PreviewBlockHeader from './PreviewBlockHeader.vue'
import PreviewAdUnit from './PreviewAdUnit.vue'

export default{
    props: ['element', 'fotoscapeObj'],
    components:{
        FotoscapeBlock,
        PreviewBlockHeader,
        PreviewAdUnit,
    }
}


</script>

<style scoped>
</style>