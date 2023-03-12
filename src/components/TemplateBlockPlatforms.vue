<template>
    <div v-if="element.platforms" class="platforms">
        <label class="platforms__label">Platforms: </label>
        <div class="platforms__list">
            <span class="platform platform--badge badge bg-primary" v-for="platform in element.platforms" :key="platform">{{
                platform }}</span>
            <input class="platform--input platform" @keyup.enter="enterPlat" :list="'unusedPlatforms' + element.id"
                :id="'platformsList' + element.id" placeHolder="..add">
            <datalist :id="'unusedPlatforms' + element.id">
                <option v-for="plat in unusedPlatforms" :value="plat" :key="plat">{{ plat }}</option>
            </datalist>
        </div>
    </div>
    <div v-if="element.excludePlatforms" class="excludes-container">
        <label>EXCLUDE PLATFORMS: </label>
        <span v-for="platform in element.excludePlatforms" :key="platform">{{ platform }}</span>

    </div>
</template>
<script>

export default {
    props: ['element', 'index'],
    computed: {
        unusedPlatforms() {
            let allPlatforms = this.$store.getters.allPlatforms; 
            let blockPlatforms = this.element.platforms;


            let clone = JSON.parse(JSON.stringify(allPlatforms)); 


            let returnArray = clone.filter(item => !blockPlatforms.includes(item)); 
            console.log(returnArray)
            return returnArray; 
        },
    },
    methods: {
        enterPlat(evt) {
            if (this.unusedPlatforms.includes(evt.target.value)){
                const returnBlock = this.element;

                returnBlock.platforms.push(evt.target.value);

                this.$store.dispatch('replaceBlock', {
                    index: this.index,
                    block: returnBlock,
                })
                evt.target.value = ''
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