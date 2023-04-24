<template>
    <section class="list-container" v-if="isVisible">
        <div class="list-header" v-if="pageName != 'workset'">
            <div class="header-buttons">
                <button class="btn btn-outline-dark btn-sm" @click="loadPreview(pageName)"><img
                        src='../../assets/preview.png'></button>
                <button class="btn btn-outline-dark btn-sm" @click="minimizeList(pageName)"><img
                        src='../../assets/minimize-icon.png'></button>
                <button type="button" @click="toggleCollapse" class="btn btn-sm btn-outline-dark"><img
                        src='../../assets/expand-collapse.png'></button>
            </div>
            <label class="header-label">{{ pageName }}</label>


        </div>


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
                    :index="index"
                    :collapseStatus="collapseStatus">
                </template-item>
            </template>
        </draggable>
    </section>
</template>


<script setup>
import { defineProps, computed, ref, provide } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'

const store = useStore();
const props = defineProps(['pageName'])

const collapseStatus = ref(false)
const showList = ref(true);

function loadPreview(page) {
    console.log(page);
    store.dispatch('setActivePage', page)

}
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
        store.dispatch('replaceList', payload)
    }
});

const isVisible = ref(true); 

function deleteItem(id) {
    const payload = {
        targetList: props.pageName,
        targetId: id
    }
    store.dispatch('deleteListItem', payload)
}

function minimizeList() {
    // store.state.activePages = store.state.activePages.filter((page) => page != pageName);
    isVisible.value = !isVisible.value
}

function toggleCollapse(){
   collapseStatus.value = !collapseStatus.value; 
}



provide('deleteItem', deleteItem);
provide('listName', props.pageName)





</script>


<style scoped>
.list-header {
    font-weight: bold;
    font-size: large;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    padding: .3rem;


}

img {
    width: 1rem;
}

label {
    margin-left: 1rem;
}

button {
    margin-right: .1rem;
}

.list-header:hover {
    cursor: pointer;
}

.list-container {
    margin: .5rem .5rem;
    background: lightgrey;
    padding: .1rem;
    border-radius: 5px;
}
</style>