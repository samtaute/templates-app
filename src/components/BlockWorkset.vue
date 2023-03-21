<template>
    <base-sidebar-widget>
        <template #header>
            Block Workset
        </template>
        <template #content>
            <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../assets/Plus.svg"
                    class="title-image">
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="blockType of Object.keys(blockModels)" :key="blockType"><a class="dropdown-item"
                        @click="createBlock(blockModels[blockType])" href="#">{{blockType}}</a></li>
            </ul>
            <div v-if="this.$store.getters.currentWorkset.length === 0"><span>Add Blocks</span></div>
            <draggable v-model='newBlocks' container='newBlocks' :disabled="!enabled" item-key="name"
                class="list-group layout-container" ghost-class="ghost" group="blocks" :move="checkMove"
                @start="dragging = true" @end="dragging = false">
                <template #item="{ element, index }">
                    <template-block class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element"
                        :index="index">
                    </template-block>
                </template>
            </draggable>
        </template>

    </base-sidebar-widget>
</template>

<script>
import draggable from 'vuedraggable'
import TemplateBlock from './template/TemplateBlock.vue'
import blockModels from '@/models/blockModels';

export default {
    components: {
        draggable,
        TemplateBlock
    },
    data() {
        return {
            dragging: false,
            enabled: true,
            blockModels: blockModels,
        }
    },

    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        createBlock(block, evt) {
            let clone = JSON.parse(JSON.stringify(block));
            this.$store.dispatch('createBlock', clone)
            evt.target.blur(); 
        },
    },

    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },


        newBlocks: {
            get() {
                return this.$store.getters.currentWorkset;
            },
            set(value) {
                this.$store.commit('setWorkset', value)
            }

        },
        allPlatforms() {
            return this.$store.getters.allPlatforms;
        }
    }

}

</script>