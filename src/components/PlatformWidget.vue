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
.cricket{
    background-color: aliceblue;
}
.blu{
    background-color: aqua;
}
.boost{
    background-color: beige;
}
.firstly{
    background-color:#8E402A
}
.metropcs{
    background-color: #9C9C9C; 
}
.pwg{
    background-color: #00BB2D
}
.moment{
    background-color: #7E7B52;
}

</style>