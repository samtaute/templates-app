<template>
    <div class="main-area">
        <template-page></template-page>
        <preview-container></preview-container>
    </div>
</template>

<script>
import TemplatePage from '../template/TemplatePage.vue'
import PreviewContainer from '../preview/refactored/PreviewContainer.vue'


export default{
    components:{
        TemplatePage,
        PreviewContainer
    }
}
</script>
<style scoped>
.main-area{
    display: flex; 
    flex-wrap: nowrap;
    background:lightyellow;
    flex-grow: 1;
    margin-left: 22rem; 
}

</style>