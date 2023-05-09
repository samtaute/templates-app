<template>
    <!-- <div v-if="element.platforms.includes(activePlatform) || activePlatform === 'all'"> -->
    <div>
        <component :is="previewType" :element="element"></component>

        <!-- <preview-ad-unit v-if="element.blockType === 'ad_unit'" :element='element'
            :key="element.blockType"></preview-ad-unit>
        <fotoscape-block v-if="element.blockType === 'fotoscape_block'" :element='element'
            :key="element.blockType"></fotoscape-block>
        <sponsored-block v-if="element.blockType === 'outbrain_block'" :element='element'></sponsored-block>
        <unknown-block :element='element' v-if="unknown"></unknown-block>
        <preview-block-header v-if="element.blockType === 'header_block'" :element='element'></preview-block-header> -->

    </div>
</template>
<script setup>
import PreviewDefault from './blocktypes/PreviewDefault.vue'
import PreviewFotoscape from './blocktypes/PreviewFotoscape.vue'
// import { useStore } from 'vuex'
import { defineProps, computed} from 'vue'




// const store = useStore();
const props = defineProps({
    element: Object,
});

// const activePlatform = computed(() => {
//     return store.getters.activePlatform;
// })

// const previewComponents = {
//     PreviewDefault,
//     FotoscapeBlock,
//     PreviewAdUnit,
//     SponsoredBlock,
//     PreviewBlockHeader
// }

const previewType = computed(() => {
    let previewType;
    switch (props.element.blockType) {
        case 'fotoscape_block':
            previewType = PreviewFotoscape
            break; 
        default:
            previewType = PreviewDefault
    }
    return previewType; 
})


//     reveal() {
//         let widgetTypes = ['memes_widget_block', 'fortune_cookie_block', 'jokes_widget_block']
//         if (widgetTypes.includes(this.element.blockType)) {
//             return true;
//         } else {
//             return false;
//         }
//     },
//     unknown() {
//         let knownBlocks = ['outbrain_block', 'fotoscape_block', 'ad_unit', 'memes_widget_block', 'fortune_cookie_block', 'jokes_widget_block', 'header_block'];
//         if (!knownBlocks.includes(this.element.blockType)) {
//             return true;
//         } else {
//             return false;
//         }

//     }
// }
// }


</script>

<style scoped></style>