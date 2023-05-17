<template>
    <base-sidebar-widget>
        <template #header>
            Workset
        </template>
        <template #content>
            Block <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../assets/Plus.svg"
                    class="title-image">
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="blockType of Object.keys(blockDefaults)" :key="blockType"><a class="dropdown-item"
                        @click="createBlock(blockDefaults[blockType], $event)" href="#">{{ blockType }}</a></li>
            </ul>
            Section <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../assets/Plus.svg"
                    class="title-image">
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="sectionType of Object.keys(sectionDefaults)" :key="sectionType"><a class="dropdown-item"
                        @click="createSection(sectionType)" href="#">{{ sectionType }}</a></li>
            </ul>
            <template-list :directoryKey="'workset'"></template-list>
        </template>

    </base-sidebar-widget>
</template>

<script setup>

import blockDefaults from '@/models/block-defaults';
import sectionDefaults from '../models/section-defaults'
import TemplateList from './template/TemplateList.vue';
import useProcessor from '@/hooks/processor';
import { useStore } from 'vuex'


const {processItem} = useProcessor; 
const store = useStore();
// const dragging = ref(false);


// const allPlatforms = computed(() => {
//     return store.getters.allPlatforms
// })

function createBlock(block, evt) {
    let clone = JSON.parse(JSON.stringify(block));
    store.dispatch('createItem', clone)
    evt.target.blur();
}


function createSection(sectionType) {
    let items = sectionDefaults[sectionType];
    for (let item of items) {
        processItem(item);
    }
    let block = {
        blockType: sectionType,
        items: items,
    }
    store.dispatch('createItem', block)
}


</script>