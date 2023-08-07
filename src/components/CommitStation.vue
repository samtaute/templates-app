<template>
    <section class="commit-container">
        <div class="commit-header">
            <input class="form-control" placeholder="Enter commit message" v-model="commitMessage"><button type="button"
                class="btn btn-primary" @click="publishChanges">Publish</button>
        </div>
        <label>{{ activeBranch }}</label>
        <div class="commit-entries">
            <div v-for="page of revisedPages" :key="page" class="commit-entry">
                <button type="button" class="btn .btn-sm btn-primary">{{ page }}</button>
                <a href="#" @click="demote(page)">Demote</a>
            </div>
        </div>
    </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';
import useProcessor from '@/hooks/processor';
import useAlert from '../hooks/alert'

const { processContent } = useProcessor();
const [showAlert] = useAlert();

const store = useStore();

const commitMessage = ref('')

const revisedPages = computed(() => {
    let revisedPages = store.getters.revisedPages.filter((page) => page != 'workset')
    return revisedPages
});

const activeBranch = computed(() => {
    return store.getters.activeBranch;
})

function demote(page) {
    console.log(page)
    store.state.revisedPages = store.state.revisedPages.filter((p) => p != page);
    console.log(store.state.revisedPages)
}

function publishChanges() {
    if (activeBranch.value === 'master') {
        showAlert('alert-danger', 'Tried to commit to master')
    } else if (commitMessage.value.length === 0) {
        showAlert('alert-danger', 'Please input a commit message')
    }
    else {
        let actions = generateActions();

        if (actions.length > 0) {
            let payload = {
                message: commitMessage.value,
                actions
            }

            store.dispatch('updateFiles', payload);
        }else{
            console.log('no actions')
        }


        // for (let page of revisedPages.value) {
        //     let content = store.getters.pageDirectory[page];
        //     content = processContent(content);
        //     if (content) {
        //         let payload = {
        //             contentstring: content,
        //             filename: page,
        //             branchInput: activeBranch.value,
        //         }
        //         store.dispatch('updateFile', payload);
        //     }
        // }
    }
}

function generateActions() {
    let actions = [];
    for (let page of revisedPages.value) {
        let filePath;
        let content = store.getters.pageDirectory[page];
        if (page.includes('portal') && !page.includes('index_page_portal')){
            filePath = `/content/src/raw/pages/portals/${page}`
        } else {
            filePath = `/content/src/raw/pages/content_pages/${page}`
        }
        content = processContent(content);
        if (content) {
            let action = {
                action: "update",
                file_path: filePath,
                content: content
            }
           
            actions.push(action);
        } else {
            showAlert('alert-danger', 'Page failed validation')
        }

    }
    console.log(actions)
    return actions;
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

.commit-entries {
    display: flex;
    flex-direction: column;
    row-gap: .2rem;
}

.commit-entry {
    display: flex;
    column-gap: 1rem;
    align-items: center;
}
</style>
