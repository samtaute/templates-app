<template>
    <div id="app-subheader">
        <div id="product-ribbon">
            <button v-for="product in products" type="button" class="btn btn-info" :key="product">{{ product }}</button>
        </div>
        <div id="platform-ribbon" v-if="pageLoaded">
            <button v-for="platform in platforms" type="button" class="btn btn-info" :key="platform"
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
        products() {
            return this.$store.getters.allProducts;
        }
    },
    methods: {
        selectPlatform(currPlatform) {
            this.$store.dispatch('activatePlatform', { platform: currPlatform })
        }
    }
}

</script>
<style>
#app-subheader{
    display: flex; 
    width: 100%; 
    justify-content: left;
}
#platform-ribbon{
    margin-left: 8rem; 
}

</style>