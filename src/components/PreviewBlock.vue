<template>
    <div v-if="element.platforms.includes(activePlatform) || activePlatform === 'all'">
        <preview-ad-unit v-if="element.blockType === 'ad_unit'" :element='element'
            :key="element.blockType"></preview-ad-unit>
        <fotoscape-block v-if="element.blockType === 'fotoscape_block'" :element='element'
            :key="element.blockType"></fotoscape-block>
        <sponsored-block v-if="element.blockType === 'outbrain_block'" :element='element'></sponsored-block>
        <unknown-block :element='element' v-if="unknown"></unknown-block>
        <preview-block-header v-if="element.blockType==='header_block'" :element='element'></preview-block-header>
        
    </div>


</template>
<script>
import FotoscapeBlock from './FotoscapeBlock.vue'
import PreviewAdUnit from './PreviewAdUnit.vue'
import SponsoredBlock from './SponsoredBlock.vue'
import PreviewBlockHeader from './PreviewBlockHeader.vue'
import UnknownBlock from './UnknownBlock.vue'


export default {
    props: ['element', 'fotoscapeObj'],
    components: {
        FotoscapeBlock,
        PreviewAdUnit,
        SponsoredBlock,
        PreviewBlockHeader,
        UnknownBlock
    },
    computed: {
        activePlatform() {
            return this.$store.getters.activePlatform;
        },
        reveal(){
            let widgetTypes = ['memes_widget_block','fortune_cookie_block','jokes_widget_block']
            if(widgetTypes.includes(this.element.blockType)){
                return true; 
            }else{
                return false; 
            }
        },
        unknown(){
            let knownBlocks = ['outbrain_block','fotoscape_block','ad_unit','memes_widget_block','fortune_cookie_block','jokes_widget_block','header_block'];
            if (!knownBlocks.includes(this.element.blockType)){
                return true; 
            }else{
                return false; 
            }

        }
    }
}


</script>

<style scoped>

</style>