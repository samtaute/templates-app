<template>
    <section class="list-container">
    <div class="list-header" @click="showList = !showList">{{ pageName }}</div>
    <draggable
        v-if="showList"
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
    </section>
</template>


<script setup>
import { defineProps, computed, ref, provide} from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'

const store = useStore();
const props = defineProps(['pageName'])

const showList=ref(true); 


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
            pageHandle: props.pageName,
            blocks: newValue,
        }
        //todo: 
        store.dispatch('replaceList', payload)
    }
});

function deleteItem(id){
    const payload = {
        targetList: props.pageName,
        targetId: id
    }
    store.dispatch('deleteListItem', payload)
}



provide('deleteItem', deleteItem);
provide('listName', props.pageName)





</script>


<style scoped>
    .list-header{
        max-width: 21rem; 
        font-weight: bold;
        font-size: large;
    }
    .list-header:hover{
        cursor: pointer;
    }
    .list-container{
        margin: 0px .5rem; 
    }
</style>