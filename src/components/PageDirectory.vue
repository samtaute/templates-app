<template>
    <base-sidebar-widget>
        <template #header>
            Directory
        </template>
        <template #content>
            <section class="directory">
                <div class="branch-input">
                    <input class='form-control branch-input' v-model="branchInput"
                        placeholder="Input branch name (optional)" list="branch-options">
                    <datalist id="branch-options">
                        <option :key=option v-for="option of activeBranches">{{ option }}</option>
                    </datalist><button
                        class="btn btn-primary btn-sm" @click="updateBranch(branchInput)"
                        type="button">Switch
                        Branch</button>
                </div>
                <label>{{ currentBranch }}</label>
                <div class="search-inputs">
                    <input type="text" v-model="searchString" placeholder="search for file..."
                        class="form-control directory-search">
                    <label>Lang</label>
                    <select v-model="lang" class="form-control form-control-sm">
                        <option>en</option>
                        <option>es</option>
                        <option>es-mx</option>
                    </select>
                </div>
                <div class="button-container">
                    <button type="button" class="badge bg-primary" v-for="page of displayedPages"
                        :class="{ active: runFilters(page) }" :key="page"
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
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { processPage } from '@/utilities/processing';


const store = useStore();

let activeBranches = ref([])

onMounted(() => {
    loadBranches();

})


const lang = ref('en')
const filters = computed(() => {
    return store.getters.filters;
});

const pageDirectory = computed(() => {
    return store.getters.pageDirectory;
})
const activeFilters = computed(() => {
    let activeFilters = [];
    for (const [key, value] of Object.entries(filters.value)) {
        if (value.length > 0) {
            activeFilters.push(key);
        }
    }

    return activeFilters;
});

const filteredPages = computed(() => {
    if (activeFilters.value.length === 0) return [];
    return Object.keys(pageDirectory.value).filter((page) => checkFilters(pageDirectory.value[page]['blocks']))
})
function runFilters(page) {
    return filteredPages.value.includes(page)
}
//returns true if page contains one element that meets filter criteria. 
function checkFilters(blockList) {

    for (let block of blockList) {
        if (checkAllFilters(block)) return true;
    }
    return false;
}

function checkAllFilters(block) {
    for (const filterKey of activeFilters.value) {
        if (!checkFilter(block, filterKey, filters.value[filterKey]))
            return false;
    }
    return true;
}


function checkFilter(element, configKey, configValue) {
    let elementKeys = Object.keys(element);
    let returnCheck = false;

    for (let eKey of elementKeys) {
        if (typeof element[eKey] === 'object') {
            returnCheck = checkFilter(element[eKey], configKey, configValue)
        }
        if (eKey === configKey && element[eKey] === configValue) {
            return true;
        }
    }
    return returnCheck;

}

const branchInput = ref("");



const searchString = ref("");

let pageNames = computed(() => {
    return Object.keys(pageDirectory.value).filter((page) => page != 'workset')
});

let displayedPages = computed(() => {
    return pageNames.value.filter((page) => {
        let check = page.includes(`${lang.value}__`) && page.includes(searchString.value);
        return check;
    })
})

function activatePage(page) {
    processPage(store.state.pageDirectory[page]);
    store.state.pageDirectory[page]['status'] = 'displayed'

    // store.dispatch('activatePage', page)
}

function truncate(pageTitle) {
    let shortened = pageTitle.replace("en__", "").replace(".json", "");
    return shortened;
}


function updateBranch(branchName) {
    store.dispatch('switchBranch', branchName)

}
const currentBranch = computed(() => {
    return store.getters.currentBranch;
})

async function loadBranches() {
    let branches = [];

    for (let i = 0; i < 7; i++) {
        let requestUrl = `https://gitlab.com/api/v4/projects/31495766/repository/branches?per_page=100&page=${i}`

        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                "PRIVATE-TOKEN": "glpat-jyMdXVXNnTcsr8_omboM"
            }
        });
        if (response.ok) {
            const data = await response.json();
            for (let branch of data) {
                branches.push(branch.name);
            }
        }



    }


    activeBranches.value = branches
}


</script>
<style scoped> .directory {
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

 .branch-input {
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
 }

 .active {
     background-color: red !important;
 }

 .search-inputs {
     display: flex;
     align-items: center;
     column-gap: .2rem;

 }
</style>