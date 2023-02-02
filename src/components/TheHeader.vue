<template>
    <header>
        <div class="header-icon">
            <h2>Templates</h2>
        </div>
        <div id="header-details">
            <h3>{{ fileName }} {{ pageTitle }}</h3>
        </div>
    </header>
</template>
<script>

export default {
    components: {

    },
    computed: {
        fileName() {
            return this.$store.getters.fileName;
        },
        pageTitle() {
            return this.$store.getters.pageTitle;
        }
    }

}

</script>
<style scoped>
.header-icon {
    justify-self: start;
}
</style>