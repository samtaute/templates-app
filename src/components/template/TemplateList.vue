<!-- test -->
<template>
    <section class="list-container" v-if="isVisible">
        <div class="list-header" v-if="showHeader">
            <div class="header-buttons">
                <button class="btn btn-outline-dark btn-sm" @click="loadPreview(directoryKey)"><img
                        src='../../assets/preview.png'></button>
                <button class="btn btn-outline-dark btn-sm" @click="minimizeList(directoryKey)"><img
                        src='../../assets/minimize-icon.png'></button>
                <button type="button" @click="toggleCollapse" class="btn btn-sm btn-outline-dark"><img
                        src='../../assets/expand-collapse.png'></button>
            </div>
            <label class="header-label">{{ directoryKey }}</label>
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
                    :fullPath="updatePath(index)"
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


const props = defineProps({
    fullPath: {
        type: Object,
        default(rawProps) {
            return [rawProps.directoryKey, 'blocks']
        }
    },
    element: Object,
    directoryKey: {
        type: String,
    },
    showHeader: {
        type: Boolean,
        default: false
    }
})

provide('directoryKey', props.directoryKey)

function updatePath(idx) {
    let arr = [...props.fullPath]
    arr = ([...arr, idx])
    // console.log(arr); 
    return arr;
}

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
        var list;

        let target = store.getters.pageDirectory;
        for (let i = 0; i < props.fullPath.length; i++) {
            target = target[props.fullPath[i]];
        }

        list = target;
        if (list.length === 0) {
            //to do - execute store action instead of editing directly
            list.push({
                blockType: "header_block",
                settings: {
                    subheader: "Placeholder"
                }
            });
        }
        return list;
    },
    set(newValue) {
        //to do - execute store action instead of editing directly

        let target = store.state.pageDirectory;
        for (let i = 0; i < props.fullPath.length; i++) {
            if (i === props.fullPath.length - 1) {
                console.log(newValue)
                target[props.fullPath[i]] = newValue;
                return;
            }
            target = target[props.fullPath[i]];
        }
    }
});

const isVisible = ref(true);

function minimizeList() {
    // store.state.activePages = store.state.activePages.filter((page) => page != directoryKey);
    isVisible.value = !isVisible.value
}

function toggleCollapse() {
    collapseStatus.value = !collapseStatus.value;
}








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