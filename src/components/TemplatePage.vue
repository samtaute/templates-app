<template>
    <div id="page-template-container">
        <draggable v-model='myList' :disabled="!enabled" item-key="name" group="blocks" class="list-group layout-container"
            ghost-class="ghost" :move="checkMove" @start="dragging = true" @end="dragging = false">
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
import TemplateBlock from './TemplateBlock.vue'

export default {
    components: {
        draggable,
        TemplateBlock,
    },
    data() {
        return {
            dragging: false,
            enabled: true,
        };
    },

    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        }
    },


    computed: {
        //recommended by draggable documentation.
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        //recommended by draggable documentation
        myList: {
            get() {
                return this.$store.getters.currentBlocksJson;
            },
            set(newBlockList) {
                this.$store.commit('setBlocksJson', newBlockList)
            }

        },
        activePlatform() {
            return this.$store.getters.activePlatform;
        }
    },



}
</script>
<style>
#page-template-container {
    height: 100%;
    width: 25rem;
    margin: 2rem 2rem;
    display: inline-block;
}
</style>