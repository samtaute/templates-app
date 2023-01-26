<template>
        <div id="platform-ribbon">
            <div v-if="pageLoaded">
                <button v-for="platform in platforms" type="button" class="btn btn-info btn-sm" :class="platform" :key="platform"
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
<style>

</style>