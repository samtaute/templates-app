<template>
    <li class="block-container" :key="index" :class="[element.blockType, { highlighted: isHighlighted}]"
        v-if="!isFiltered">
        {{ elementHasActivePlatform }}
        <div :key="index" class="header__buttons">
            <button @click="deleteItem(element.id)" type="button" class="btn btn-sm btn-outline-danger"><img
                    src='../../assets/delete.png'></button>
            <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success"><img
                    style="width: 18px" src='../../assets/duplicate-icon.png'></button>
        </div>
        <template-item-config
            v-for="(value, key) in element"
            :label="key"
            :element="element"
            :key="key"
            :value="value"
            :fullPath="updatePath(key)"
            :indent="1">
        </template-item-config>
    </li>
</template>
<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();



const props = defineProps({
    element: Object,
    index: Number,
    fullPath: Object,
});

function updatePath(key) {
    let temp = [...props.fullPath]
    return [...temp, key]
}


function deleteItem() {
    store.dispatch('deleteTemplateObject', props.fullPath)
}

function duplicateBlock() {
    let clone = JSON.parse(JSON.stringify(props.element));

    store.dispatch('createItem', clone)

}


const elementHasActivePlatform = computed(() => {
    let activePlatform = store.getters.activePlatform;
    let {platforms, excludePlatforms} = props.element; 
    if(platforms){
        if(!platforms.includes(activePlatform)){
            return false
        }else return true; 
    }else if (excludePlatforms){
        if(excludePlatforms.includes(activePlatform)){
            return false; 
        }else return true; 
    }else{
        return true; 
    }
})

const isHighlighted = computed(() => {
    let filterKeys = Object.keys(store.getters.filters).filter((key) => store.getters.filters[key]);
    if (filterKeys.length === 0) return false;

    for (let filter of filterKeys) {
        if (!checkFilter(props.element, filter, store.getters.filters[filter]))
            return false;
    }
    return true;
});

const isFiltered = computed(() => {
    if (store.getters.filterActive) {
        return !isHighlighted.value
    }
    else return false;
})

//takes an element and recursively searches it for matching configKey/configValue. Returns true if match is found.
function checkFilter(element, configKey, configValue) {
    if (configKey === 'platform') {
        return elementHasActivePlatform.value
    }
    let elementKeys = Object.keys(element);
    let returnCheck = false;

    for (let eKey of elementKeys) {
        if (typeof element[eKey] === 'object') {
            returnCheck = checkFilter(element[eKey], configKey, configValue)
        }
        if (eKey === configKey && element[eKey] === configValue) {
            return true;
        }
    }
    return returnCheck;

}

</script>

<style scoped>
.block-container {
    display: flex;
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
    margin-top: 4px;
    min-width: 22rem;
    padding: .2rem 0 .5rem 0;
}

.section_block,
.ticker_block,
.experiment_block {
    background: lightblue;
    border: .6rem solid lightblue;
}

.highlighted {
    background-color: yellow;
}

.header__buttons {
    position: absolute;
    right: .1rem;
}
</style>