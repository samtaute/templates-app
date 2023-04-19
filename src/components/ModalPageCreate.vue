<template>
    <section>
        <!-- Button trigger modal -->

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-page-modal">
            Launch demo modal
        </button>
        <!-- Modal -->
        <div class="modal fade" id="create-page-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label class="col-form-label">Page Name</label>
                                </div>
                                <div class="col-auto">
                                    <input v-model="pageName" type="text" id="page-name-input" class="form-control"
                                        aria-describedby="pagenameinput">
                                </div>
                            </div>
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                    <label class="col-form-label">Layout Type</label>
                                </div>
                                <div class="col-auto">
                                    <select v-model="section" class="form-select">
                                        <option v-for="section of sections" :key=section>{{ section }}</option>
                                    </select>
                                </div>
                            </div>
                            <label class="form-label">Monetization:</label>
                            <input v-model="monetization" type="range" class="form-range" min="0" max="2" id="customRange2">

                            <label class="form-label">Primary Category: </label>
                            <select v-model="primaryCategory" class="form-select" aria-label="multiple select example">
                                <option v-for="option of catOptions" :key="option"></option>
                            </select>
                            <label class="form-label">Secondary Categories</label>
                            <select v-model="secondaryCategories" class="form-select" multiple
                                aria-label="multiple select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label class="form-label">Widgets</label>
                            <select v-model="widgets" class="form-select" multiple aria-label="multiple select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="submit()">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import sectionDefaults from '@/models/section-defaults';
import configOptions from '@/models/configs/config-options'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const pageName = ref('')
const section = ref('');
const monetization = ref('');
const primaryCategory = ref('');
const secondaryCategories = ref([]);
const widgets = ref([]);

const sections = computed(() => {
    return Object.keys(sectionDefaults);
})
const store = useStore();

const possibleCats = computed(() => {
    let returnVal = [...secondaryCategories.value]

    return returnVal.unshift(primaryCategory.value);
})

const catOptions = computed(()=>{
    return Object.keys(configOptions)
})

function submit() {
    console.log("Page Name: ", pageName.value)
    console.log("Section: ", section.value)
    console.log("Monetizaton: ", monetization.value)
    console.log("Primary Category ", primaryCategory.value)
    console.log("Secondary Categories ", secondaryCategories.value)
    console.log("Widgets ", widgets.value)
    createPage();
}



function createPage() {
    let blockList = [];

    blockList.push(...sectionDefaults.discover1)


    for (let block of blockList) {
        let found = 0;
        if (block.blockType === 'fotoscape_block') {
            if (found === 0) {
                block.settings.category = primaryCategory;
            }
            else{
                //returns random integer between 1 & 3
                let random = (Math.floor(Math.random()*100))%3
                block.settings.category = possibleCats[random]
            }

        }
    }


    store.state.pageDirectory[pageName.value] = {
        blocks: blockList,
    }

}

// pageDirectory: {
//                 workset: {
//                     blocks: []
//                 }
//             },


</script>