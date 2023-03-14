<template>
    <div class="the-main-area">
        <template-page></template-page>
        <page-preview></page-preview>
        <widget-container></widget-container>
    </div>
</template>

<script>
import TemplatePage from './TemplatePage.vue'
import PagePreview from './PagePreview.vue'
import WidgetContainer from './WidgetContainer.vue'


export default{
    components:{
        TemplatePage,
        PagePreview,
        WidgetContainer,
    }
}
</script>
<style scoped>
.the-main-area{
    display: flex; 
    flex-wrap: nowrap;
    background:lightyellow;
    flex-grow: 1;
    margin-left: 22rem; 
}
/* #content-container{
    background:lightyellow;
    vertical-align: top;
    flex-grow: 1;
    margin-top:6rem; 
    padding-top: 1rem;
    justify-content: left;
    align-items: center;
    position: relative;
    overflow: scroll;
    height: 100%;
    display: flex; 

} */

</style>