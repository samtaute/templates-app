<template>
    <div class="main-area">
        <div class=alert-container>
            <div v-for='alert of alerts' :key="alert" class="alert fade show" :class="alert.type" role="alert">
                {{ alert.message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

        </div>
        <template-list v-for="dirKey in displayedPages" :showHeader="true" :directoryKey="dirKey"
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
import { useStore } from 'vuex'

const store = useStore();

const displayedPages = computed(() => {
    let displayedPages = []; 
    for (let [key, value] of Object.entries(store.state.pageDirectory)){
        if (value.status === 'displayed'){
            displayedPages.push(key)
        }
    }
    return displayedPages; 
})

function createPage() {

    promptUser('Name your page')
        .then((filename) => {
            filename = filename.toLowerCase(); 
            if (checkFilename(filename)) {
                if (!store.state.pageDirectory[filename]) {
                    store.state.pageDirectory[filename] = {
                        blocks: [],
                    }
                    store.state.activePages.unshift(filename)
                } else {
                    alert('That file name is already in use')
                }
            }
        })

    function checkFilename(filename) {
        if (!filename.includes('.json')) {
            alert('Filename needs to include .json')
            return false
        }
        if (!filename.includes('en__') && !filename.includes('es__')) {
            alert('Filename needs to include en__ or es__')
            return false
        }
        return true;
    }

    function promptUser(message) {
        return new Promise((resolve) => {
            let pageName = prompt(message)
            if (pageName) {
                resolve(pageName)
            }
        })
    }
}

const alerts = computed(() => {
    return store.state.alerts;
})
</script>
<style scoped>
.alert-container {
    position: absolute;
    width: 30rem;
    z-index: 999;
}

.main-area {
    display: flex;
    flex-wrap: nowrap;
    background: lightyellow;
    flex-grow: 1;
    margin-left: 28rem;
    padding-left: 1.6rem;
    position: relative;
}
</style>