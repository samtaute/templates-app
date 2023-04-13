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
            <template-list pageName="workset"></template-list>
        </template>

    </base-sidebar-widget>
</template>

<script>

import blockDefaults from '@/models/block-defaults';
import sectionDefaults from '../models/section-defaults'
import TemplateList from './template/TemplateList.vue';


export default {
    components: {
        // draggable,
        // TemplateBlock,
        TemplateList,
    },
    data() {
        return {
            dragging: false,
            enabled: true,
            blockDefaults: blockDefaults,
            sectionDefaults: sectionDefaults, 
        }
    },

    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        allPlatforms() {
            return this.$store.getters.allPlatforms;
        }
    },
    methods: {
        createBlock(block, evt) {
            let clone = JSON.parse(JSON.stringify(block));
            //todo
            this.$store.dispatch('createItem', clone)
            evt.target.blur();
        },
        createSection(sectionType){
            let block = {
                blockType: sectionType,
                items: this.sectionDefaults[sectionType]
            }
            this.$store.dispatch('createItem',block)
        }
    }

}

</script>