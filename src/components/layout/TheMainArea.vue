<template>
    <div class="main-area">
        <template-list v-for="page in directoryPages" :pageName="page" :key="page + Date.now()"></template-list>

        <div class="dropdown">
            <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../../assets/Plus.svg"
                    class="title-image">
            </a>
            <div class="dropdown">
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="createPage()" href="#">Empty Template</a></li>
                    <li><modal-create-page></modal-create-page></li>
                </ul>
   
            </div>
        </div>
        <preview-container></preview-container>
    </div>
</template>

<script>
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'
import TemplateList from '../template/TemplateList.vue';
import ModalCreatePage from '../ModalPageCreate.vue';


export default {
    components: {
        TemplateList,
        PreviewContainer,
        ModalCreatePage,
    },
    data(){
        return {
            count: 0
        }
    },
    computed: {
        directoryPages() {
            return this.$store.getters.activePages
            // return Object.keys(this.$store.getters.pageDirectory).filter(page => page!='workset')
        }
    },
    methods:{
        createPage(){
            let filename = 'sandbox ' + this.count; 
            this.$store.state.pageDirectory[filename] = {
                blocks:[], 
            }
            this.$store.state.activePages.unshift(filename)
            this.count++
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
    margin-left: 28rem;
    padding-left: 1.6rem;
}
</style>