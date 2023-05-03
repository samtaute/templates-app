<template>
    <base-sidebar-widget>
        <template #header>Publish</template>
        <template #content>
            <section class="commit-container">
                <div class="commit-header">
                    <input class="form-control" placeholder="Enter commit message"><button type="button"
                        class="btn btn-primary" @click="publishChanges">Publish</button>
                </div>
                <label>{{ currentBranch }}</label>
                <div class="commit-entries">
                    <div v-for="page of revisedPages" :key="page" class="commit-entry">
                        <button type="button" class="btn .btn-sm btn-primary">{{ page }}</button>
                        <a href="#">Preview</a>
                        <a href="#">Demote</a>
                    </div>
                </div>
            </section>
        </template>


    </base-sidebar-widget>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import { updateFile } from '../import'
import useValidate from '../hooks/validate'
import useAlert from '../hooks/alert'

const [validateContent, processContent] = useValidate();
const [showAlert] = useAlert(); 

const store = useStore();

const revisedPages = computed(() => {
    let revisedPages = store.getters.revisedPages.filter((page) => page != 'workset')
    return revisedPages
});

const currentBranch = computed(() => {
    return store.getters.currentBranch;
})

function publishChanges() {
    if (currentBranch.value === 'master') {
        showAlert('alert-danger', 'Tried to commit to master')
    }

    else {
        for (let page of revisedPages.value) {
            let content = store.getters.pageDirectory[page];
            content = processContent(content);
            let validated = validateContent(content);
            if (validated) {
                updateFile(content, page, currentBranch.value);
            } else {
                showAlert('alert-danger', 'Page failed validation')
            }
        }
    }
}




</script>
<style scoped>
.commit-header {
    display: flex;
    column-gap: .2rem;
}

.commit-header>input {
    width: 15rem;
}

.commit-entry {
    display: flex;
    column-gap: 1rem;
    align-items: center;
}
</style>
