<template>
    <div class="the-main-area">
        <template-page></template-page>
        <page-preview></page-preview>
    </div>
</template>

<script>
import TemplatePage from '../template/TemplatePage.vue'
import PagePreview from '../preview/PagePreview.vue'


export default{
    components:{
        TemplatePage,
        PagePreview,
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