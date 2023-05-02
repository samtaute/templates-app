<template>
    <base-sidebar-widget>
        <template #header>
            Directory
        </template>
        <template #content>
            <section class="directory">
                <div class="branch-input">
                    <input class='form-control branch-input' v-model="branchInput" placeholder="Input branch name (optional)"><button
                    class="btn btn-primary btn-sm" @click="updateBranch(branchInput)" type="button">Switch Branch</button>
                </div>
                <label>{{ currentBranch }}</label>
                <input type="text" v-model="searchString" placeholder="search for file..."
                    class="form-control directory-search">
                <div class="button-container">
                    <button type="button" class="badge bg-primary" v-for="page of displayedPages" :key="page"
                        @click="activatePage(page)"><span>{{ truncate(page) }}</span></button>
                </div>
                <!-- <div class="button-container">
                    <div class="button-column">
                        <button v-for="page of discoverPages" :key="page"><span>{{ truncate(page) }}</span></button>
                    </div>

                    <div class="button-column">
                        <button v-for="page of appPages" :key="page"><span>{{ truncate(page) }}</span></button>
                    </div>
                </div> -->
            </section>
        </template>


    </base-sidebar-widget>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { loadNeptuneRepo } from '@/import';
const store = useStore();

const branchInput = ref(""); 

const pageDirectory = computed(() => {
    return store.getters.pageDirectory;
});

const searchString = ref("");

let pageNames = computed(() => {
    return Object.keys(pageDirectory.value).filter((page)=>page!='workset')
});

let displayedPages = computed(() => {
    return pageNames.value.filter((page) => {
        return page.includes(searchString.value);
    })
})

function activatePage(page) {
    store.dispatch('activatePage', page)
}

function truncate(pageTitle) {
    let shortened = pageTitle.replace("en__", "").replace(".json", "");
    return shortened;
}


function updateBranch(branchName) {
    store.state.currentBranch = branchName; 
    loadNeptuneRepo(branchName);
}
const currentBranch = computed(()=>{
    return store.getters.currentBranch; 
})

</script>
<style scoped> 
.directory {
     display: flex;
     flex-direction: column;
     row-gap: .3rem;
 }

 .button-container {
     display: flex;
     column-gap: 2px;
     row-gap: 2px;
     width: 24rem;
     flex-wrap: wrap;

 }
 .branch-input{
    display: flex;
 }

 /* span {
     font-size: .8rem;
 } */

 .button-column {
     display: flex;
     flex-direction: column;
     background: lightblue;
     width: 6.5rem;
     /* height: 30rem; */
 }</style>