<template>
    <div class="basic-block">
        <pre>
            <code>
                {{blockInfo}}
            </code>
        </pre>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    element: Object,
})

const blockInfo = computed(()=>{
    return JSON.stringify(props.element, null, 2); 
})

</script>

<style scoped>
.basic-block{
    padding: 5px; 
    border: 1px solid grey; 
    display: flex; 
    flex-direction: column;
    align-items: middle; 
    margin: 5px; 
}

</style>