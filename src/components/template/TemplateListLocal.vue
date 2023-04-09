<template>
<draggable
        v-model="directoryList"
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


export default {
    components: {
        draggable,
    },
    props:['list', 'element'], 

    provide() {
        return {
            deleteItem: this.deleteItem,
            updateItem: this.updateItem
        }
    },
    inject:['listName'], 

    data() {
        return {
            dragging: false,
            enabled: true,
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
        },
        directoryList:{
            get(){
                let list = this.$store.state.pageDirectory[this.listName]['blocks'].find((item)=> item.id === this.element.id)['items']
                return list; 
            },
            set(newValue){
                console.log(this.listName)
                this.$store.state.pageDirectory[this.listName]['blocks'].find((item)=> item.id === this.element.id)['items'] = newValue; 
            }
       
        }
    },
    mounted(){
        this.localList = this.list; 
    }



}
</script>
<style></style>