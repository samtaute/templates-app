<template>
    coming soon...
        <!-- <preview-block v-for="(element, idx) in blocks" :element="element" :key="idx"></preview-block> -->

</template>
<script>
// import PreviewBlock from './PreviewBlock.vue'

export default{
    // components:{
    //     PreviewBlock
    // },
    computed: {
        blocks(){
            let currHandle = this.$store.getters.activePreview;
            return this.$store.getters.pageDirectory[currHandle]['blocks'];  
        }
    },
}


</script>

<style>


</style>