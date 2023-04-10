<template>
    <section class="block-container" :class="[element.blockType, { highlighted: elementHighlighted }]"
        v-if="elementHasActivePlatform">
        <div class="header">
            <h4> {{ title }}</h4>
            <div class="header__buttons">
                <button @click="deleteItem(element.id)" type="button" class="btn btn-sm btn-outline-danger"><img
                        src='../../assets/delete.png'></button>
                <button type="button" @click="duplicateBlock" class="btn btn-sm btn-outline-success"><img
                        style="width: 18px" src='../../assets/duplicate-icon.png'></button>
            </div>
        </div>
        <template-item-platforms :element=element></template-item-platforms>
        <template-list-local v-if="element.items" :element="element" :list="element.items"></template-list-local>

        <template-item-config
            v-for="(value, key, index) in element"
            :label="key"
            :skip="skipProperties"
            :element="element"
            :path="[key]"
            :key="key"
            :indent="0"
            :value="value"
            :index="index">

        </template-item-config>



    </section>
</template>
<script setup>
import { defineProps, inject, computed } from 'vue'
import { useStore } from 'vuex'
import TemplateItemPlatforms from './TemplateItemPlatforms.vue'
import TemplateListLocal from './TemplateListLocal.vue'


const props = defineProps({
    element: Object
});
const store = useStore();

const deleteItem = inject('deleteItem')

const skipProperties = ['blockType', 'platforms', 'excludePlatforms', 'items', 'id']

function duplicateBlock() {
    let clone = JSON.parse(JSON.stringify(props.element));

    store.dispatch('createItem', clone)

}

const title = computed(() => {
    return props.element.blockType;
})

const elementHasActivePlatform = computed(() => {
    if(store.getters.filterActive){
        if (!elementHighlighted.value){
            return false; 
        }
    }
    let activePlatform = store.getters.activePlatform;
    if (!activePlatform || activePlatform === 'ALL') {
        return true;
    } else if (!props.element.platforms && !props.element.excludePlatforms) {
        return true;
    } else if (props.element.platforms) {
        if (props.element.platforms.includes(activePlatform) || props.element.platforms.length === 0) {
            return true;
        } else return false;
    } else if (props.element.excludePlatforms) {
        if (props.element.excludePlatforms.includes(activePlatform)) {
            return false;
        } else return true;
    } else return false;

})

const elementHighlighted = computed(() => {
    let filterKeys = Object.keys(store.getters.filters).filter((key) => store.getters.filters[key] != "none");
    if (filterKeys.length === 0) return false;

    for(let filter of filterKeys){
        if (!checkFilter(props.element, filter, store.getters.filters[filter]))
        return false; 
    }

    // for (let filter of filterKeys) {
    //     if (!props.element.settings) return false;
    //     if (store.getters.filters[filter] != props.element.settings[filter]) {
    //         // console.log(filters[filter])
    //         // console.log(props.element[filter])
    //         return false;
    //     }
    // }
    return true;
});

//takes an element and recursively searches it for matching configKey/configValue. Returns true if match is found.
function checkFilter(element, configKey, configValue){
    console.log(configKey, configValue)
    let elementKeys = Object.keys(element); 
    let returnCheck = false; 
    for(let eKey of elementKeys){
        if(typeof element[eKey] === 'object'){
            returnCheck = checkFilter(element[eKey], configKey, configValue)
        }
        if (eKey === configKey && element[eKey] === configValue){
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
.ticker_block {
    background: lightblue;
    border: .6rem solid lightblue;
}

.header {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    /* background-color: #f1f3f4; */
    padding: 0px .5rem;
    vertical-align: center;
}

h4 {
    margin: 0;
}

.highlighted {
    background-color: yellow;
}
</style>