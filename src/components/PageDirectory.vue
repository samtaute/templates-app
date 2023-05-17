<template>
    <base-sidebar-widget>
        <template #header>
            Directory
        </template>
        <template #content>
            <section class="directory">
                <label>{{ activeBranch }}</label>
                <div class="search-inputs">
                    <input type="text" v-model="searchString" placeholder="search for file..."
                        class="form-control directory-search">
                    <label>Lang</label>
                    <select v-model="lang" class="form-control form-control-sm">
                        <option>en</option>
                        <option>es</option>
                        <option>es_mx</option>
                        <option>hi</option>
                        <option>pt</option>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const store = useStore();

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
    if (blockList) {
        for (let block of blockList) {
            if (checkAllFilters(block)) return true;
        }
        return false;

    }

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

function activatePage(pagename) {
    store.dispatch('loadPage', pagename);
}

function truncate(pageTitle) {
    let shortened = pageTitle.replace("en__", "").replace(".json", "");
    return shortened;
}

const activeBranch = computed(() => {
    return store.getters.activeBranch;
})

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