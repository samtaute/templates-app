<template>
    <div class="main-area">
        <directory-template-list v-for="page in directoryPages" :pageName="page" :key="page"></directory-template-list> 
        <preview-container></preview-container>
    </div>
</template>

<script>
// import TemplateList from '../refactoredtemplate/TemplateList.vue'
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'
import DirectoryTemplateList from '../refactoredtemplate/DirectoryTemplateList.vue';


export default {
    components: {
        DirectoryTemplateList, 
        PreviewContainer
    },
    computed:{
        directoryPages(){
            return Object.keys(this.$store.getters.pageDirectory).filter(page => page!='workset')
        }
    }
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