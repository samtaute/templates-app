<template>
    <draggable
        v-model='itemList'
        :disabled="!enabled"
        item-key="name"
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


<script setup>
import { defineProps, computed, ref, provide } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'

const store = useStore();
const props = defineProps(['pageName'])


//draggable dependencies
const dragging = ref(false);
const enabled = ref(true);
function checkMove(e) {
    window.console.log("Future index: " + e.draggedContext.futureIndex);
}
// const draggingInfo = computed(() => {
//     return this.dragging ? "under drag" : "";
// });

const itemList = computed({
    get() {
        return store.getters.pageDirectory[props.pageName]['blocks'];
    },
    set(newValue) {
        let payload = {
            name: props.pageName,
            blocks: newValue,
        }
 
        store.dispatch('setBlocksOnPage', payload)
    }
});


function updateItem(updatedBlock){
    const payload = {
        targetList: props.pageName, 
        updatedBlock: updatedBlock
    }
    store.dispatch('updateListItem', payload)
}
function updateValue(obj, lab, val){
    obj[lab] = val; 
}

function deleteItem(id){
    const payload = {
        targetList: props.pageName,
        targetId: id
    }
    store.dispatch('deleteListItem', payload)
}

provide('updateItem', updateItem)
provide('deleteItem', deleteItem)
provide('updateValue', updateValue)




</script>

<style scoped></style>