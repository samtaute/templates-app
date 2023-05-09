<template>
    <preview-pseudo v-for="(element, idx) in blocks" :element="element" :key="idx"></preview-pseudo>
</template>
<script setup>
import PreviewPseudo from './PreviewPseudo.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const blocks = computed(() => {
    try {
        let currHandle = store.getters.activePreview;
        return store.getters.pageDirectory[currHandle]['blocks']
    } catch {
        store.dispatch('alert', `Error displaying blocks from ${store.getters.activePreview}`)
        return []; 
    }
})



</script>

<style></style>