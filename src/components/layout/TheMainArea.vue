<template>
    <div class="main-area">
        <template-list v-for="page in Object.keys(this.$store.getters.pageDirectory)" :list=this.$store.getters.pageDirectory[page] :key="page" :getter="get" :setter="set" :update-block="updateBlock" :delete-block="deleteBlock"></template-list>
        <preview-container></preview-container>
    </div>
</template>

<script>
import TemplateList from '../refactoredtemplate/TemplateList.vue'
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'


export default {
    components: {
        TemplateList,
        PreviewContainer
    },

    //methods passed 
    methods: {
        get() {
            return this.$store.getters.currentBlocksJson;
        },
        set(newBlockList) {
            this.$store.commit('setBlocksJson', newBlockList)
        },
        updateBlock(element){
            console.log(element)
            this.$store.dispatch('updateBlock', element);
        },
        deleteBlock(id){
            this.$store.dispatch('deleteBlock',id); 
        }
    },
}
</script>
<style scoped>
.main-area {
    display: flex;
    flex-wrap: nowrap;
    background: lightyellow;
    flex-grow: 1;
    margin-left: 25rem;
    padding-left: 1.6rem; 
}
</style>