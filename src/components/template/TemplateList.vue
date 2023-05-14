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
                <button type="button" @click="sort" class="btn btn-sm btn-outline-dark">Reset</button>
            </div>
            <label class="header-label">{{ directoryKey }}</label>
        </div>
        <div class="list-header" v-if="label">
            {{ label }}
        </div>

        <draggable
            v-if="showList"
            v-model='itemList'
            :disabled="!enabled"
            group="blocks"
            class="list-group layout-container"
            v-bind="dragOptions"
            @start="dragging = true"
            @end="dragging = false"
            item-key="uid">
            <template #item="{ element, index }">
                <template-item class="list-group-item"
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
import { defineProps, computed, ref, provide, onMounted } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'

let originalList;

onMounted(() => {
    originalList = JSON.parse(JSON.stringify(itemList.value))
})

const store = useStore();

const props = defineProps({
    fullPath: {
        type: Object,
        default(rawProps) {
            return [rawProps.directoryKey, 'blocks']
        }
    },
    element: Object,
    label: String,
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
// draggable dependencies
function sort() {
    itemList.value = originalList;
}
const dragging = ref(false);
const enabled = ref(true);

// const draggingInfo = computed(() => {
//     return this.dragging ? "under drag" : "";
// });

const dragOptions = computed(() => {
    return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
    }
});

const itemList = computed({
    get() {
        var list;

        let target = store.getters.pageDirectory;

        for (let i = 0; i < props.fullPath.length; i++) {
            target = target[props.fullPath[i]];
        }

        if (Array.isArray(target)) {
            list = target;
            // if (list.length === 0) {
            //     //to do - execute store action instead of editing directly
            //     list.push({
            //         blockType: "header_block",
            //         uid: "aldskfjdsk;fj",
            //         settings: {
            //             subheader: "Placeholder"
            //         }
            //     });
            // }
        } else {
            list = [target]
        }

        return list;
    },
    set(newValue) {
        //to do - execute store action instead of editing directly

        let payload = {
            // action: 'setList',
            path: props.fullPath,
            value: newValue,
        }
        store.dispatch('editDirectory', payload);
    }
});

const isVisible = ref(true);

function minimizeList() {
    // store.state.activePages = store.state.activePages.filter((page) => page != directoryKey);
    store.state.pageDirectory[props.directoryKey]['status']='active'; 
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

.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>