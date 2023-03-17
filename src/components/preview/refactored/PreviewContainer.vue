<template>
    <section class="preview-container">
        <div class="tab-content" id="myTabContent">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                        role="tab" aria-controls="home" aria-selected="true">JSON</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="false">Preview</button>
                </li>
            </ul>
        </div>
        <component :is="selectedComponent">
        </component>
    </section>
</template>
<script setup>
import { shallowRef } from 'vue'
import PreviewJson from './PreviewJson.vue'

const selectedComponent = shallowRef(PreviewJson)




</script>

<style scoped>
.preview-container {
    width: 6rem;
    height: 100%;
    width: 25rem;
    margin: 2rem 2rem;
    background: white;
    border-radius: 10px;
    border: 1px solid rgb(222, 226, 230);

}</style>