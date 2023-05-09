<template>
    <section v-if="hasActivePlatform" class="pseudo-block" :class="{monetized: isMonetized }" :style="`height: ${height}px;`">
        <div><b>{{ element.blockType }}</b></div>
        <div>{{ layout }}</div>
        <div>{{ category }}</div>
        <div>{{ count }}</div>
    </section>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const props = defineProps({
    element: Object,
})



const count = computed(() => {
    if (props.element.blockType === 'outbrain_block') {
        let count;
        switch (props.element.settings.widgetId) {
            case 'JS_6':
                count = 4;
                break;
            case 'JS_9':
                count = 4;
                break;
            case 'JS_13':
                count = 1;
                break;
            case 'JS_16':
                count = 2;
                break;
            case 'JS_5':
                count = 15;
                break;
            case 'JS_17':
                count = 4;
                break;
            case 'JS_21':
                count = 8;
                break;
            default:
                count = 1;
        }
        return count;
    }
    if (props.element.settings && props.element.settings.count) {
        return props.element.settings.count
    } else {
        return 1
    }
})

const type = computed(() => {
    if (props.element.settings && props.element.settings.layout) {
        return props.element.settings.layout;
    }
    else return props.element.blockType
})

const height = computed(() => {
    let baseHeight;
    let growthFactor; 
    //calculate baseHeight
    if (heightMap[type.value]) {
        baseHeight = heightMap[type.value]['height']
    } else {
        baseHeight = 288
    }

    //calculate growth factor
    if (heightMap[type.value]) {
        growthFactor = heightMap[type.value]['grow'];
    }else{
        growthFactor = 1; 
    }

    if(growthFactor === 0){
        return baseHeight
    }else{
        return baseHeight * (Math.round(count.value * growthFactor))
    }
})

const heightMap = {
    ad_unit: {
        height: 264,
        grow: 1,
    },
    large_photocard:{
        height: 398,
        grow: 1,
    },
    carousel: {
        height: 288,
        grow: 0,
    },
    ticker_block:{
        height: 112,
        grow: 0,
    },
    header_block: {
        height: 48,
        grow: 1,
    },
    stub:{
        height: 431,
        grow: 1,
    },
    tile:{
        height: 272,
        grow: .5
    },
    discover_bar:{
        height: 152,
        grow: 1
    },
    horoscope_discover_bar:{
        height: 152,
        grow: 1
    },
    'games-tile':{
        height: 272,
        grow: .5,
    },
    'list-medium': {
        height: 136,
        grow: 1
    },
    'edge-description': {
        height: 302,
        grow: 1,
    }



}

const isMonetized= computed(()=>{
    let monetizedBlocks = ['ad_unit', 'outbrain_block']
    if (monetizedBlocks.includes(props.element.blockType)){
        return true; 
    }
    else return false; 
})

const layout = computed(() => {
    return findProperty(props.element, 'layout')
})

const category = computed(() => {
    return findProperty(props.element, 'category')
})

const hasActivePlatform = computed(() => {
    let activePlatform = store.getters.activePlatform;
    let platforms = findProperty(props.element, 'platforms');
    let excludePlatforms = findProperty(props.element, 'excludePlatforms')

    if (!platforms && !excludePlatforms) {
        return true;
    }
    else if (platforms.includes(activePlatform)) {
        return true;
    }
    else if (excludePlatforms && !excludePlatforms.includes(activePlatform)) {
        return true;
    }
    else return false;

})

//Deep searches an object by key and return empty string if none is found. 
function findProperty(element, propKey) {
    let returnVal = '';
    for (let [key, value] of Object.entries(element)) {
        if (typeof value === 'object') {
            returnVal = findProperty(value, propKey)
        }
        if (key === propKey) {
            return value;
        }
    }
    return returnVal;
}


</script>
<style scoped>
.pseudo-block {
    display: flex;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
.monetized{
    background: #eefceb; 
}
</style>