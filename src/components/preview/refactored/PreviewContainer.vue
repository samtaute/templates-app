<template>
    <section class="preview-container">
        <div class="tab-content" id="myTabContent">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" @click="selectComponent('PreviewJson')" type="button"
                        role="tab" aria-controls="home" aria-selected="true">JSON</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" type="button" role="tab"
                        aria-controls="contact" aria-selected="false"
                        @click="selectComponent('PreviewContent')">Preview</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" type="button" role="tab"
                        aria-controls="contact" aria-selected="false"
                        @click="selectComponent('CommitStation')">Publish</button>
                </li>
            </ul>
        </div>
        <component :is="tabs[selectedComponent]">
        </component>
    </section>
</template>
<script setup>
import PreviewJson from './PreviewJson.vue'
import PreviewContent from '../PreviewContent.vue'
import CommitStation from '../../CommitStation.vue'
import {ref} from 'vue'

const tabs ={
    PreviewJson,
    PreviewContent,
    CommitStation,
}
const selectedComponent = ref('PreviewJson')

function selectComponent(component){
selectedComponent.value = component
}
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

}
</style>