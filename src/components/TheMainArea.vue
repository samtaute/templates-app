<template>
    <div class="the-main-area">
        <page-template></page-template>
        <page-preview></page-preview>
    </div>
</template>

<script>
import PageTemplate from './PageTemplate.vue'
import PagePreview from './PagePreview.vue'

export default{
    components:{
        PageTemplate,
        PagePreview
    }
}
</script>
<style scoped>
.the-main-area{
    display: flex; 
    flex-wrap: nowrap;
    background:lightyellow;
    flex-grow: 1;


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