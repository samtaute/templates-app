<template>
    <div class="main-area">
        <template-list v-for="dirKey in activeDirectoryKeys" :showHeader="true" :directoryKey="dirKey"
            :key="dirKey + Date.now()"></template-list>

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

<script setup>
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'
import TemplateList from '../template/TemplateList.vue';
import ModalCreatePage from '../ModalPageCreate.vue';
import { computed } from 'vue'
import {useStore} from 'vuex'

const store = useStore(); 

const activeDirectoryKeys = computed(() => {
    return store.getters.activeDirectoryKeys;
})
let count = 0; 

function createPage() {
    let filename = 'sandbox ' + count;

    store.state.pageDirectory[filename] = {
        blocks: [],
    }
    store.state.activePages.unshift(filename)
    count++
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