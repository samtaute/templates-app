<template>
    <div id="page-template-container">
        <draggable v-model='myList' :disabled="!enabled" item-key="name" group="blocks" class="list-group layout-container"
            ghost-class="ghost" :move="checkMove" @start="dragging = true" @end="dragging = false">
            <template #item="{ element, index }">
                <simple-block v-if="element.platforms.includes(activePlatform) || activePlatform === 'all'"
                    class="list-group-item" :class="{ 'not-draggable': !enabled }" :element="element" :index="index">
                </simple-block>
            </template>

        </draggable>


    </div>

</template>
<script>
import draggable from 'vuedraggable'
import SimpleBlock from './SimpleBlock.vue'
export default {
    components: {
        draggable,
        SimpleBlock
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
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },

        
        myList: {
            get() {
                return this.$store.state.blocks;
            },
            set(value) {
                this.$store.commit('updateList', value)
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