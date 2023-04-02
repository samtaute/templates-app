<template>
    <div>
        <pre>{{ pageJson }}</pre>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore();

const pageJson = computed(() => {
    let json = store.getters.pageDirectory;
    return JSON.stringify(json, (key, value) => {
        if (key === 'id') {
            return undefined;
        }
        else return value
    }, "    ");
})


</script>

<style scoped>
div{
    padding-top: 1rem;
}


</style>