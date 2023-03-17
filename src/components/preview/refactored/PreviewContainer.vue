<template>
    <section class="preview-container">
        <div class="tab-content" id="myTabContent">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" @click="selectComponent('preview-json')" type="button"
                        role="tab" aria-controls="home" aria-selected="true">JSON</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" type="button" role="tab"
                        aria-controls="contact" aria-selected="false"
                        @click="selectComponent('preview-content')">Preview</button>
                </li>
            </ul>
        </div>
        <component :is="selectedComponent">
        </component>
    </section>
</template>
<script>
import PreviewJson from './PreviewJson.vue'
import PreviewContent from '../PreviewContent.vue'

export default {
    data() {
        return{
            selectedComponent: 'preview-json'
        }

    },
    components: {
        PreviewJson,
        PreviewContent, 
    },
    methods:{
        selectComponent(component){
            this.selectedComponent = component; 
        }
    }


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