<template>
    <section>
        <div v-if="!element.platforms && !element.excludePlatforms" class="platformOptionsContainer">
            <a class="platformsOption platformsOption--include" @click="addPlatformsOption('include')">include</a> <a
                class="platformsOption platformsOption--exclude"
                @click="addExcludes(addPlatformsOption('exclude'))">exclude</a>
        </div>
        <div v-if="element.platforms" class="platforms">
            <label class="platforms__label">Platforms: </label>
            <div class="platforms__list">
                <span class="platform platform--badge badge bg-primary" v-for="platform in element.platforms"
                    @click="removePlat(platform)" :key="platform">{{
                        platform }}</span>
                <input class="platform--input platform" @keyup.enter="enterPlat" :list="'unusedPlatforms' + element.id"
                    :id="'platformsList' + element.id" placeHolder="..add">
                <datalist :id="'unusedPlatforms' + element.id">
                    <option v-for="plat in unusedPlatforms" :value="plat" :key="plat">{{ plat }}</option>
                </datalist>
            </div>
        </div>
        <div v-if="element.excludePlatforms" class="platforms">
            <label class="platforms__label">Exclude:</label>
            <div class="platforms__list">
                <span class="platform platform--badge badge bg-primary" v-for="platform in element.excludePlatforms"
                    @click="removePlat(platform)" :key="platform">{{
                        platform }}</span>
                <input class="platform--input platform" @keyup.enter="enterPlat" :list="'unusedPlatforms' + element.id"
                    :id="'platformsList' + element.id" placeHolder="..add">
                <datalist :id="'unusedPlatforms' + element.id">
                    <option v-for="plat in unusedPlatforms" :value="plat" :key="plat">{{ plat }}</option>
                </datalist>
            </div>

        </div>

    </section>
</template>
<script setup>
import useProcessor from '@/hooks/processor';
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex'

const props = defineProps({
    element: Object,
    index: Number,
})

const {processItem} = useProcessor(); 

const store = useStore();

const unusedPlatforms = computed(() => {
    let allPlatforms = store.getters.allPlatforms;
    var blockPlatforms

    if (props.element.platforms) {
        blockPlatforms = props.element.platforms;
    }
    if (props.element.excludePlatforms) {
        blockPlatforms = props.element.excludePlatforms;
    }


    let clone = JSON.parse(JSON.stringify(allPlatforms));


    let returnArray = clone.filter(item => !blockPlatforms.includes(item));
    return returnArray;
})

function enterPlat(evt) {
    if (unusedPlatforms.value.includes(evt.target.value)) {
        const returnBlock = props.element;

        if (props.element.platforms) {
            returnBlock.platforms.push(evt.target.value);
        }
        if (props.element.excludePlatforms) {
            returnBlock.excludePlatforms.push(evt.target.value);
        }
        processItem(returnBlock);
        evt.target.value = ''
    }
}


function removePlat(platform) {
    const returnBlock = props.element;

    if (returnBlock.platforms) {
        returnBlock.platforms = returnBlock.platforms.filter((plat) => plat != platform)
    }
    if (returnBlock.excludePlatforms) {
        returnBlock.excludePlatforms = returnBlock.excludePlatforms.filter((plat) => plat != platform)

    }
    //todo: 
    store.dispatch('checkFilterArray', platform);
    processItem(returnBlock);
    store.dispatch('replaceBlock', {
        id: returnBlock.id,
        block: returnBlock,
    });
}

function addPlatformsOption(type) {
    if (type === 'include') {
        let newBlock = props.element;
        newBlock.platforms = [];
        store.dispatch('replaceBlock', newBlock.id)
    }
    if (type === 'exclude') {
        let newBlock = props.element;
        newBlock.excludePlatforms = [];
        store.dispatch('replaceBlock', newBlock.id)
    }
}
</script>
<style scoped>
.platforms {
    display: flex;
    padding: .5rem;
    align-items: center;
}

.platforms__list {
    padding: 0px .5rem;
    display: flex;
    flex-wrap: wrap;
    min-height: 1rem;

}

.platform {
    margin: 0px 4px;

}

.platforms__label {
    font-size: .9rem;
}

.platformOptionsContainer {
    display: flex;
    padding-left: 2rem;
}

.platformsOption {
    padding: 2px;
    cursor: pointer;
}

.platformsOption--include {
    font: green;
}

.platformsOption--exclude {
    font: red;
}

.platform--badge {
    background: lightgreen;
    display: inline-flex;
    align-items: center;
}

.platform--input {
    width: 4rem;
    font-size: small;
    font-style: italic;
}
</style>