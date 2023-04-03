<template>
<draggable
        v-model='localList'
        :disabled="!enabled"
        item-key="id"
        group="blocks"
        class="list-group layout-container"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        end="dragging = false">
        <template #item="{ element, index }">
            <template-item class="list-group-item" :class="{ 'not-draggable': !enabled }"
                :element="element"
                :index="index">
            </template-item>
        </template>
    </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import blockModels from '@/models/blockModels';


export default {
    components: {
        draggable,
    },
    props:['list'], 
    provide() {
        return {
            deleteItem: this.deleteItem,
            updateItem: this.updateItem
        }
    },

    data() {
        return {
            dragging: false,
            enabled: true,
            blockModels: blockModels,
            localList: [],
        };
    },

    methods: {
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        deleteItem(id) {
            this.localList = this.localList.filter((item) => item.id != id);
        },
        updateItem(updatedBlock) {
            for (let block of this.localList) {
                if (block.id === updatedBlock.id) {
                    block = updatedBlock;
                }
            }
        },

    },
    computed: {
        //recommended by draggable documentation.
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        },
        allPlatforms() {
            return this.$store.getters.allPlatforms;
        }
    },
    mounted(){
        console.log(this.list); 
        this.localList = this.list; 
    }



}
</script>
<style></style>