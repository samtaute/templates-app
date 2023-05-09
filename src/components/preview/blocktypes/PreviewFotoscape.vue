<template>
    <section v-if="layout === 'trending-carousel'">
        Trending Carousel
    </section>
    <section v-if="layout != 'trending-carousel'" class="block block--fotoscapes" :class="`block--${layout}`">
        <section class="block__main"></section>
        <article class="block-item moment"></article>
            
        {{ layout }}
    </section>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    element: Object,
})
const layout = ref(props.element.settings.layout); 


</script>