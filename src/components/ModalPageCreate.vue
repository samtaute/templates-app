<template>
    <section>
        <!-- Button trigger modal -->

        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#create-page-modal">
            Create Page
        </button>
        <!-- Modal -->
        <div class="modal fade" id="create-page-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel">Setup</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- content -->
                    <div class="configs">
                        <div class="config">
                            <label class="config-label">Page Name:</label>
                            <input v-model="pageName" type="text" id="page-name-input" class="config-input form-control">
                        </div> 
                        <div class="config">
                            <label class="config-label">Template:</label>
                            <select v-model="atfTemplate" class="form-select config-input">
                                <option v-for="section of sections" :key=section>{{ section }}</option>
                            </select>
                        </div>
                        <div class="config">
                            <label class="config-label">Monetization:</label>
                            <select v-model='monetization' class="form-select config-input">
                                <option selected>standard</option>
                                <option v-for="option of monetizationLevels" :key="option">{{ option }}</option>
                            </select>
                        </div>
                        <div class="config">
                            <label class="config-label">Primary Category:</label>
                            <select v-model="primaryCategory" class="form-select config-input">
                                <option v-for="option of categoryOptions" :key=option>{{ option }}</option>
                            </select>
                        </div>
                        <div class="config">
                            <label class="config-label">Categories:</label>
                            <div class="category-container">
                                <span class="badge bg-primary" v-for="cat of secondaryCategories"
                                    @click="deleteCategory(cat)" :key="cat">{{ cat }}</span>
                                <input class="category-input" @keyup.enter="enterCategory"
                                    list="secondary-category-options"
                                    id='secondary-category-input' placeHolder="..add">
                                <datalist id='secondary-category-options'>
                                    <option v-for="option in categoryOptions" :value="option" :key="option">{{ option }}
                                    </option>
                                </datalist>
                            </div>
                        </div>
                        <div class="config">
                            <label class="config-label">Include: </label>
                            <div class="form-checks">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Ticker Block
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Reveal Widgets
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Discover Carousels
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import sectionDefaults from '@/models/section-defaults';
import { fotoscapeCategories } from '@/models/configs/config-options'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const categoryOptions = fotoscapeCategories;
const pageName = ref('');
const atfTemplate = ref('');
const monetization = ref('standard');
const primaryCategory = ref('');
const secondaryCategories = ref([]);
const widgets = ref([]);

const monetizationLevels = ['no ads', 'more ads and sponsored']
const sections = computed(() => {
    return Object.keys(sectionDefaults);
})
const store = useStore();



function submit() {
    console.log("Page Name: ", pageName.value)
    console.log("Section: ", atfTemplate.value)
    console.log("Monetizaton: ", monetization.value)
    console.log("Primary Category ", primaryCategory.value)
    console.log("Secondary Categories ", secondaryCategories.value)
    console.log("Widgets ", widgets.value)
    createPage();
}

function enterCategory(evt) {
    console.log(evt.target.value);
    console.log(secondaryCategories.value);
    secondaryCategories.value.push(evt.target.value)
    evt.target.value = "";
    evt.target.blur();
}

function deleteCategory(cat) {
    secondaryCategories.value = secondaryCategories.value.filter((c) => {
        c != cat
    }
    )

}



function createPage() {
    let blockList = [];

    //create atf section
    let section = sectionDefaults[atfTemplate.value];
    for (let block of section) {
        if (block.blockType === 'fotoscape_block') {
            block.settings.category = primaryCategory.value;
        }
    }
    blockList.push(...section)

    //create btf sections
    for (let i = 0; i < 2; i++) {
        let random = Math.random();
        let btfSection = random >= .5 ? 'btf_discover1' : 'btf_discover2';
        section = sectionDefaults[btfSection];
        for (let block of section) {
            if (block.blockType === 'fotoscape_block') {
                random = Math.floor(Math.random() * secondaryCategories.value.length)
                let category = secondaryCategories.value[random]
                block.settings.category = category
                if (block.settings.title) {
                    block.settings.title.text = category
                }
            }
        }
        blockList.push(...section);
    }

    //add blocklist to page directory
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
<style scoped>
.modal-dialog {
    margin-top: 15rem;
}

.configs {
    display: flex;
    flex-direction: column;
    min-height: 30rem;
    row-gap: .2rem;

}

.config {
    display: flex;
    column-gap: .8rem;
}

.form-checks{
    display: flex; 
    flex-direction: column;
    max-width: 14rem;
}

.config-label {
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: right;
    font-weight: bold;
}

.config-input {
    max-width: 12rem;
    display: flex;
}

.category-container {
    display: flex;
    max-width: 20rem;
    flex-wrap: wrap;
}

.category-input {
    max-width: 8rem;
}
</style>