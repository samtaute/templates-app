<template>
        <div class="buttonContainer">
                <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm" :class="`${platform}-button`" :key="platform"
                @click="selectPlatform(platform)">{{ platform }}</button>
                <div v-if = "this.$store.getters.platformsFilterArray.length === 0"><span>No Platforms Available for Filtering</span></div>
        </div>
</template>
<script>
export default {
    computed: {
        platforms() {
            return this.$store.getters.platformsFilterArray;
        },
        pageLoaded() {
            return this.$store.getters.pageLoaded
        },
    },
    methods: {
        selectPlatform(selectedPlatform) {
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

.buttonContainer{
    display: flex; 
    width: 100%; 
    flex-wrap: wrap;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
    padding: .5rem .2rem;

}

</style>