<template>
    <div class="header">
         {{props.value}}
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    value: [String, Object, Number, Boolean],   
})



</script>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    align-items: center;
    /* background-color: #f1f3f4; */
    padding: 0px .5rem;
    font-weight: bold;
    vertical-align: center;
}
h4 {
    margin: 0;
}
</style>