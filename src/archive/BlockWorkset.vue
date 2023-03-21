<template>
    <BaseTitle @click="toggleVisibility" :class="{ open: isVisible }">
        Block Workset
        <a href="#" role="button" id="newBlockDropdown" data-bs-toggle="dropdown"><img src="../assets/Plus.svg"
                class="title-image">
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="blockType of Object.keys(blockModels)" :key="blockType"><a class="dropdown-item"
                    @click.stop="createBlock(blockModels[blockType])" href="#">{{ blockType }}</a></li>
        </ul>
    </BaseTitle>
    <div v-if="isVisible">
        <div v-if="this.$store.getters.currentWorkset.length === 0"><span>No blocks</span></div>
        <draggable v-model='newBlocks' container='newBlocks' :disabled="!enabled" item-key="name"
            class="list-group layout-container" ghost-class="ghost" group="blocks" :move="checkMove"
            @start="dragging = true" @end="dragging = false">
            <template #item="{ element, index }">
                <template-block class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element"
                    :index="index">
                </template-block>
            </template>
        </draggable>

    </div>
</template>

<script>
import draggable from 'vuedraggable'
import TemplateBlock from '../components/template/TemplateBlock.vue'
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
            isVisible: true,
            blockModels: blockModels,
        };
    },

    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        createBlock(block) {
            let clone = JSON.parse(JSON.stringify(block));
            this.$store.dispatch('createBlock', clone)
            this.isVisible = true;
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

<style scoped>
.title-image {
    position: relative;
    top: 2px;
    width: 14px;
    cursor: pointer;
    margin: 0px 12px;
    padding-bottom: 4px;
    opacity: 50%;
}

.title-image:hover {
    opacity: 1;
}
</style>