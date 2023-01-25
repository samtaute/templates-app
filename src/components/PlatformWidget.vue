<template>
    <div id="platform-ribbon">
        <button v-for="platform in platforms" type="button" class="btn btn-info" :key="platform"
            @click="selectPlatform(platform)">{{ platform }}</button>
    </div>
</template>
<script>
export default {
    computed: {
        platforms() {
            return this.$store.getters.platforms
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
.platform-ribbon {
    display: flexbox;
}
</style>