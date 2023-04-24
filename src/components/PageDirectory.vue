<template>
    <base-sidebar-widget>
        <template #header>
            Directory
        </template>
        <template #content>
            <section class="directory">
                <input type="text" v-model="searchString" placeholder="search for file..." class="form-control directory-search">
                <div class="button-container">
                    <button type="button" class="badge bg-primary" v-for="page of displayedPages" :key="page" @click="activatePage(page)"><span>{{ truncate(page) }}</span></button>
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

const pageDirectory = computed(() => {
    return store.getters.pageDirectory;
});

const searchString = ref(""); 

let pageNames = computed(() => {
    return Object.keys(pageDirectory.value)
});

let displayedPages = computed(()=>{
    return pageNames.value.filter((page)=>{
        return page.includes(searchString.value); 
    })
})

function activatePage(page){
    store.state.activePages.push(page)
}

// const discoverPages = computed(() => {
//     return pageNames.value.filter((page) => {
//         return page.includes('discover')
//     })
// });


// const categoryPages = computed(() => {
//     return pageNames.value.filter((page) => {
//         let regex = /\d\d\d\d/;
//         let val = !page.includes("discover") && !page.includes('app_') && !regex.test(page)
//         return val;
//     })
// })
// const dailybriefPages = computed(() => {
//     let regex = /\d\d\d\d/;
//     return pageNames.value.filter((page) => regex.test(page))
// })

// const appPages = computed(() => {
//     return pageNames.value.filter((page) => page.includes('app_'))
// })

function truncate(pageTitle) {
    let shortened = pageTitle.replace("en__", "").replace(".json", "");
    return shortened;
}




</script>
<style> .directory {
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
</style>