<template>

    <div v-for="n in item.settings.count" :key="n">
        <img :src="content[n].images[0]"/>
    </div>

</template>

<script>
export default {
    props: ['item', 'content'],


}

</script>

<style scoped>

</style>

