<template>
    <div class="main-area">
        <template-list v-for="page in directoryPages" :pageName="page" :key="page"></template-list>
       <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../../assets/Plus.svg"
                class="title-image">
        </a>
        <preview-container></preview-container>
    </div>
</template>

<script>
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'
import TemplateList from '../template/TemplateList.vue';


export default {
    components: {
        TemplateList,
        PreviewContainer,
    },
    computed: {
        directoryPages() {
            return this.$store.getters.activePages
            // return Object.keys(this.$store.getters.pageDirectory).filter(page => page!='workset')
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