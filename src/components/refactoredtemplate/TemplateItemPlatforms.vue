<template>
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
</template>
<script>
import { processBlockJson } from '@/utilities/processing';
export default {
    props: ['element', 'index'],
    computed: {
        //returns an array of all platforms not included on block
        unusedPlatforms() {
            let allPlatforms = this.$store.getters.allPlatforms;
            var blockPlatforms

            if(this.element.platforms){
                blockPlatforms = this.element.platforms;
            }
            if(this.element.excludePlatforms){
                blockPlatforms = this.element.excludePlatforms;
            }


            let clone = JSON.parse(JSON.stringify(allPlatforms));


            let returnArray = clone.filter(item => !blockPlatforms.includes(item));
            return returnArray;
        },
    },
    methods: {
        enterPlat(evt) {
            if (this.unusedPlatforms.includes(evt.target.value)) {
                const returnBlock = this.element;

                if(this.element.platforms){
                    returnBlock.platforms.push(evt.target.value);
                }

                if(this.element.excludePlatforms){
                    returnBlock.excludePlatforms.push(evt.target.value);

                }

                processBlockJson(returnBlock);

                evt.target.value = ''
            }
        },
        
        removePlat(platform) {
            const returnBlock = this.element;

            if(returnBlock.platforms){
                returnBlock.platforms = returnBlock.platforms.filter((plat) => plat != platform)
            }
            if(returnBlock.excludePlatforms){
                returnBlock.excludePlatforms = returnBlock.excludePlatforms.filter((plat) => plat != platform)

            }

            this.$store.dispatch('checkFilterArray', platform);
            processBlockJson(returnBlock);
            this.$store.dispatch('replaceBlock', {
                id: returnBlock.id,
                block: returnBlock,
            });
        },
        addPlatformsOption(type) {
            if (type === 'include') {
                let newBlock = this.element;
                newBlock.platforms = [];
                this.$store.dispatch('replaceBlock', newBlock.id)
            }
            if (type === 'exclude') {
                let newBlock = this.element;
                newBlock.excludePlatforms = [];
                this.$store.dispatch('replaceBlock', newBlock.id)
            }
        }
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
.platforms__label{
    font-size: .9rem; 
}

.platformOptionsContainer {
    display: flex;
    padding-left: 2rem;
}

.platformsOption{
    padding: 2px; 
    cursor: pointer; 
}

.platformsOption--include{
    font: green;
}
.platformsOption--exclude{
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
}</style>