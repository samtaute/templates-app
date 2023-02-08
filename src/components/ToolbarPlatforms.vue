<template>
        <div>
            <div v-if="pageLoaded">
                <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm" :class="`${platform}-button`" :key="platform"
                @click="selectPlatform(platform)">{{ platform }}</button>
            </div>
          
        </div>
</template>
<script>
export default {
    computed: {
        platforms() {
            return this.$store.getters.allPlatforms
        },
        pageLoaded() {
            return this.$store.getters.pageLoaded
        },
    },
    methods: {
        selectPlatform(currPlatform) {
            this.$store.dispatch('activatePlatform', { platform: currPlatform })
        }
    }
}

</script>
<style scoped>
.btn-sm{
    font-size: 11px; 
    color: white; 
    font-weight: bold; 
    display: block; 
    width: 100%
}

</style>