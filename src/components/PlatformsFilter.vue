<template>
        <div class="buttonContainer">
                <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm" :class="{active: platform === activePlatform}" :key="platform"
                @click="selectPlatform(platform)">{{ platform }}</button>
                <div v-if = "this.$store.getters.platformsFilterArray.length === 0"><span>No Platforms Available for Filtering</span></div>
        </div>
</template>
<script>

export default {
    computed: {
        platforms() {
            let array = this.$store.getters.platformsFilterArray;
            array.push('ALL')
            return array;
        },
        pageLoaded() {
            return this.$store.getters.pageLoaded;
        },
        activePlatform(){
            return this.$store.getters.activePlatform; 
        }
    },
    methods: {
        selectPlatform(selectedPlatform) {
            //Template  block handles "ALL" option
            this.$store.dispatch('activatePlatform', selectedPlatform)
        }
    }
}

</script>
<style scoped>
span{
    font-size: small;
    font-style: italic;
}
.btn-sm{
    font-size: 11px; 
    color: white; 
    font-weight: bold; 
    display: block; 
    margin: 1.5px; 
}
.active{
    opacity: 50%; 
}

.buttonContainer{
    display: flex; 
    width: 100%; 
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    padding: .5rem .2rem;

}

</style>